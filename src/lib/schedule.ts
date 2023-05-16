import { DateTime, Duration } from 'luxon'

// Models
import Appointment from '../models/appointment'
import Consultation from '../models/consultation'

// Types
import { QueueStatus } from '../types'
import logger from './logger'

export async function schedule(
	_travel_duration: number,
	new_appointment: Appointment,
	queued_appointments: Array<Appointment>,
	consultation: Consultation
) {
	// All in minutes
	const avg_service_duration = Duration.fromObject({ minutes: 10 })
	const doctor_buffer_duration = Duration.fromObject({ minutes: 2 })
	const patient_buffer_duration = Duration.fromObject({ minutes: 10 })
	const travel_duration = Duration.fromObject({ seconds: _travel_duration })

	const [start_hours, start_minutes, start_seconds] = consultation.start_time
		.split(':')
		.map(c => parseInt(c))
	const [end_hours, end_minutes, end_seconds] = consultation.end_time
		.split(':')
		.map(c => parseInt(c))

	const start_time = DateTime.now().set({
		hour: start_hours,
		minute: start_minutes,
		second: start_seconds,
	})

	const end_time = DateTime.now().set({
		hour: end_hours,
		minute: end_minutes,
		second: end_seconds,
	})

	let result: QueueStatus | false

	if (queued_appointments.length == 0) {
		const eta = DateTime.max(
			DateTime.now().plus(patient_buffer_duration).plus(travel_duration),
			start_time
		)
		if (eta > end_time) return false
		const etd = eta.minus(travel_duration)
		if (etd < DateTime.now()) return false

		new_appointment.set('rank', 1)
		new_appointment.set('eta', eta.toISO()!)
		new_appointment.set('etd', eta.toISO()!)
		logger.debug(
			`new_appointment is ${JSON.stringify(new_appointment.dataValues)}`
		)
		// await new_appointment.save()

		result = {
			size: 1,
			position: 1,
			eta: eta.toFormat('HH:mm:ss'),
			etd: etd.toFormat('HH:mm:ss'),
		}
	} else {
		const queued_etas = queued_appointments.map(appointment =>
			DateTime.fromISO(appointment.eta!)
		)

		const free_eta = queued_etas.find(
			(queued_eta, i) =>
				queued_eta.diff(queued_etas[i + 1]).toMillis() >
				2 * avg_service_duration.plus(doctor_buffer_duration).toMillis()
		)

		if (free_eta == null) return false

		const eta = free_eta.plus(
			free_eta.plus(avg_service_duration).plus(doctor_buffer_duration)
		)
		if (eta > end_time) return false

		const etd = eta.minus(travel_duration).minus(patient_buffer_duration)
		if (etd < DateTime.now()) return false

		new_appointment.set('rank', queued_appointments.length + 1)
		new_appointment.set('eta', eta.toISO()!)
		new_appointment.set('etd', eta.toISO()!)
		logger.debug(
			`new_appointment is ${JSON.stringify(new_appointment.dataValues)}`
		)
		// await new_appointment.save()

		result = {
			size: queued_appointments.length + 1,
			position: queued_appointments.length + 1,
			eta: eta.toFormat('HH:mm:ss'),
			etd: etd.toFormat('HH:mm:ss'),
		}
	}

	return result
}

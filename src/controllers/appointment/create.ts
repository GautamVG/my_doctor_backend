import { type RequestHandler } from 'express'

// Models
import Appointment from '../../models/appointment'
import Consultation from '../../models/consultation'
import Clinic from '../../models/clinic'

// Lib
import { ClientError, InternalServerError } from '../../lib/errors'
import {
	// create_ops_group,
	create_trip,
	// estimate_order,
	// start_device_tracking,
	// start_order_tracking,
} from '../../lib/hypertrack'

// Types
import logger from '../../lib/logger'

export const controller: RequestHandler = async (req, res, next) => {
	if (!req.body.hasOwnProperty('consultation_uuid'))
		throw new ClientError(400, 'Missing consultation_uuid')

	try {
		const appointment = await Appointment.create(req.body)
		res.json(appointment)

		// Reading associated consultation to get associated clinic uuid
		// @ts-ignore
		const consultation: Consultation = await appointment.getConsultation()

		// Reading associated clinic to get destination coordinates
		const clinic = await Clinic.findByPk(consultation.clinic_uuid)
		if (clinic == null)
			throw new InternalServerError(
				500,
				'consultation resource contained unknown clinic_uuid'
			)

		const trip_res = await create_trip(
			appointment.hypertrack_device_id,
			appointment.uuid,
			[clinic.long, clinic.lat]
		)
		logger.debug(`Got trip estimate: ${JSON.stringify(trip_res)}`)

		// const device_tracking_res = await start_device_tracking(
		// 	appointment.hypertrack_device_id
		// )
		// logger.debug(
		// 	`got device tracking res: ${JSON.stringify(device_tracking_res)}`
		// )
		// await log_to_local_webhook(
		// 	`got device tracking res`,
		// 	device_tracking_res
		// )

		// const ops_res = await create_ops_group(appointment.uuid)
		// logger.debug(`got ops res: ${JSON.stringify(ops_res)}`)
		// await log_to_local_webhook(`got ops res`, ops_res)

		// Estimate the travel duration to the destination
		// const estimate = await estimate_order(
		// 	appointment.hypertrack_device_id,
		// 	appointment.uuid,
		// 	[clinic.long, clinic.lat]
		// )
		// logger.debug(`Got estimate: ${JSON.stringify(estimate)}`)
		// await log_to_local_webhook(`got estimate`, estimate)
	} catch (e) {
		next(e)
	}
}

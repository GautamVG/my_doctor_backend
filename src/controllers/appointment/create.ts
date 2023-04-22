import { type RequestHandler } from 'express'

// Models
import Appointment from '../../models/appointment'
// import Consultation from '../../models/consultation'
// import Clinic from '../../models/clinic'

// Lib
import fcm_send_msg from '../../lib/fcm_send_msg'
import { estimate_leaving_time } from '../../lib/utils'
import { ClientError } from '../../lib/errors'
// import {
// 	create_ops_group,
// 	estimate_order,
// 	start_device_tracking,
// 	start_order_tracking,
// } from '../../lib/hypertrack'

// Types
import { type QueueStatus } from '../../types'

export const controller: RequestHandler = async (req, res, next) => {
	if (!req.body.hasOwnProperty('consultation_uuid'))
		throw new ClientError(400, 'Missing consultation_uuid')

	try {
		const count = await Appointment.count({
			where: {
				consultation_uuid: req.body['consultation_uuid'],
			},
		})

		const appointment = await Appointment.create({
			...req.body,
			rank: count + 1,
		})
		res.json(appointment)

		const travel_duration = Math.random() * (1200 - 900) + 900
		const eta = count * 5 * 60

		const msg: QueueStatus = {
			size: `${count}`,
			position: `${count + 1}`,
			eta: `${eta}`,
			leave_in: `${estimate_leaving_time(travel_duration, eta)}`,
		}

		await fcm_send_msg(
			msg,
			appointment.getDataValue('fcm_registration_token')
		)

		// Start tracking the device that created the appointment
		// await start_device_tracking(
		// 	appointment.getDataValue('hypertrack_device_id')
		// )

		// Reading associated consultation to get associated clinic uuid
		// const consultation = await Consultation.findByPk(
		// 	appointment.getDataValue('consultation_uuid')
		// )

		// Reading associated clinic to get destination coordinates
		// const clinic = await Clinic.findByPk(
		// 	consultation!.getDataValue('clinic_uuid')
		// )

		// Start tracking the order
		// await start_order_tracking(
		// 	appointment.getDataValue('hypertrack_device_id'),
		// 	appointment.getDataValue('uuid'),
		// 	[
		// 		clinic!.getDataValue('lat'),
		// 		clinic!.getDataValue('long')
		// 	]
		// )

		// const ops_res = await create_ops_group(appointment.getDataValue('uuid'))
		// logger.debug(`got ops res: ${JSON.stringify(ops_res)}`)

		// // Estimate the travel duration to the destination
		// const estimate = await estimate_order(
		// 	appointment.getDataValue('hypertrack_device_id'),
		// 	appointment.getDataValue('uuid'),
		// 	[clinic!.getDataValue('lat'), clinic!.getDataValue('long')]
		// )

		// logger.debug(`Got estimate: ${JSON.stringify(estimate)}`)
	} catch (e) {
		next(e)
	}
}

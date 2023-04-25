import { type RequestHandler } from 'express'

// Models
import Appointment from '../../models/appointment'
import Consultation from '../../models/consultation'
import Clinic from '../../models/clinic'

// Lib
import fcm_send_msg from '../../lib/fcm_send_msg'
import { estimate_leaving_time } from '../../lib/utils'
import { ClientError, InternalServerError } from '../../lib/errors'
import {
	create_ops_group,
	estimate_order,
	start_device_tracking,
	start_order_tracking,
} from '../../lib/hypertrack'

// Types
import { type QueueStatus } from '../../types'
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

		const device_tracking_res = await start_device_tracking(
			appointment.hypertrack_device_id
		)
		logger.debug(
			`got device tracking res: ${JSON.stringify(device_tracking_res)}`
		)

		const ops_res = await create_ops_group(appointment.uuid)
		logger.debug(`got ops res: ${JSON.stringify(ops_res)}`)

		// Estimate the travel duration to the destination
		const estimate = await estimate_order(
			appointment.hypertrack_device_id,
			appointment.uuid,
			[clinic.long, clinic.lat]
		)
		logger.debug(`Got estimate: ${JSON.stringify(estimate)}`)
	} catch (e) {
		next(e)
	}
}

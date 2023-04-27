import { Op } from 'sequelize'
import { type RequestHandler } from 'express'

// Model
import Appointment from '../models/appointment'

// Lib
import fcm_send_msg from '../lib/fcm_send_msg'
import logger from '../lib/logger'

// Types
import { FCMMessage } from '../types'
import { schedule } from '../lib/schedule'
import Consultation from '../models/consultation'

export const controller: RequestHandler = async (req, res, next) => {
	res.sendStatus(200)

	if (Array.isArray(req.body)) req.body.forEach(evaluate)
	else evaluate(req.body)
}

async function evaluate(payload: any) {
	logger.info('Received webhook payload: ' + JSON.stringify(payload))

	if (payload.hasOwnProperty('device_id') && payload.hasOwnProperty('type')) {
		const { type, device_id, data } = payload

		const appointment = await get_appointment_with_device_id(device_id)
		if (appointment == null) {
			logger.error(
				`Webhook payload contained undefined device_id: ${device_id}`
			)
			return
		}

		switch ([type, data['value']].join(':')) {
			// case 'route:estimate_generated':
			// 	route_estimate_generated(data, appointment)
			// 	break

			case 'order:first_eta':
				first_eta_generated(data, appointment)
				break

			default:
				logger.warn(
					`Webhook payload contained unhandled type: ${type}, ${data['value']}`
				)
		}
	} else {
		logger.info('Received no `device_id` or `type` field in webhook')
	}
}

async function get_appointment_with_device_id(device_id: string) {
	try {
		return await Appointment.findOne({
			where: { hypertrack_device_id: device_id },
		})
	} catch (e) {
		const err = JSON.stringify(e)
		logger.error(
			`Error in fethcing appointment referenced in webhook from db: ${err}`
		)
		return null
	}
}

// async function route_estimate_generated(data: any, appointment: Appointment) {
// 	const count = await Appointment.count({
// 		where: {
// 			consultation_uuid: appointment.consultation_uuid,
// 		},
// 	})

// 	await appointment.update({
// 		rank: count + 1,
// 	})

// 	const estimate = data['estimate']
// 	const travel_duration = estimate['duration']
// 	const eta = count * 5 * 60

// 	const msg: QueueStatus = {
// 		size: `${count}`,
// 		position: `${count + 1}`,
// 		eta: `${eta}`,
// 		leave_in: `${estimate_leaving_time(travel_duration, eta)}`,
// 	}

// 	fcm_send_msg(msg, appointment.fcm_registration_token)
// }

async function first_eta_generated(data: any, appointment: Appointment) {
	const appointments = await Appointment.findAll({
		where: {
			consultation_uuid: appointment.consultation_uuid,
			rank: {
				[Op.not]: null,
			},
		},
	})

	const consultation = await Consultation.findByPk(
		appointment.consultation_uuid
	)
	if (consultation == null) {
		logger.error(
			`Invalid consultation uuid present in appointment resource with PK: ${appointment.uuid}`
		)
		return
	}

	const travel_duration = data['remaining_duration']
	const queue_status = schedule(
		travel_duration,
		appointment,
		appointments,
		consultation
	)

	if (queue_status == false) {
		const msg: FCMMessage = {
			status: 'cancelled',
		}
		fcm_send_msg(msg, appointment.fcm_registration_token)
		return
	}

	const msg: FCMMessage = {
		status: 'scheduled',
		size: `${queue_status.size}`,
		position: `${queue_status.position}`,
		eta: `${queue_status.eta}`,
		etd: `${queue_status.etd}`,
	}

	fcm_send_msg(msg, appointment.fcm_registration_token)
}

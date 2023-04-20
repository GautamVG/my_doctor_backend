import { type RequestHandler } from 'express'

import fcm_send_msg from '../lib/fcm_send_msg'
import Appointment from '../models/appointment'
import logger from '../lib/logger'

export const controller: RequestHandler = async (req, res, next) => {
	res.sendStatus(200)

	console.log('Webhook: ')
	console.log(req.body)

	if (req.body.hasOwnProperty('device_id')) {
		logger.info('Received no device id in webhook')
		try {
			const appointment = await Appointment.findOne({
				where: {
					device_id: req.body['device_id'],
				},
			})

			const success = await fcm_send_msg(
				req.body,
				appointment?.getDataValue('fcm_registration_token')
			)

			if (success) logger.info('Sent message in response to webhook')
			else logger.info('Sent message in response to webhook')
		} catch (e) {
			logger.error('Received unknown device id in webhook')
		}
	}
}

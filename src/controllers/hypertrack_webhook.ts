import { type RequestHandler } from 'express'

import fcm_send_msg from '../lib/fcm_send_msg'
import Appointment from '../models/appointment'
import logger from '../lib/logger'

export const controller: RequestHandler = async (req, res, next) => {
	res.sendStatus(200)

	if (Array.isArray(req.body)) req.body.forEach(evaluate)
	else evaluate(req.body)

	async function evaluate(data: any) {
		logger.info('Reading webhook data: ' + JSON.stringify(data))
		if (data.hasOwnProperty('device_id')) {
			try {
				const appointment = await Appointment.findOne({
					where: {
						device_id: req.body['device_id'],
					},
				})

				if (appointment == null)
					logger.error('Received unknown device id in webhook')
				// const success = await fcm_send_msg(
				// 	data,
				// 	appointment!.getDataValue('fcm_registration_token')
				// )
				// if (success) logger.info('Sent message in response to webhook')
				else
					logger.info('Could not send message in response to webhook')
			} catch (e) {
				logger.error('Error in webhook: ' + JSON.stringify(e))
			}
		} else {
			logger.info('Received no device id in webhook')
		}
	}
}

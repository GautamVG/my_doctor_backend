import { type RequestHandler } from 'express'
import isUUID from 'validator/lib/isUUID'

import { type UrlParamValidationOptions } from '../../types'
import { ClientError } from '../../lib/errors'

// Models
import Appointment from '../../models/appointment'

export const url_param_validation_options: UrlParamValidationOptions = [
	{
		name: 'uuid',
		validations: [
			{
				passing: isUUID,
				failing_msg: 'The UUID is invalid',
			},
		],
	},
]

export const controller: RequestHandler = async (req, res, next) => {
	try {
		const appointment = await Appointment.findByPk(req.params.uuid)
		if (appointment == null) {
			const err = new ClientError(404, 'No appointment found')
			next(err)
		} else {
			appointment.destroy()
			const appointments_in_the_queue = await Appointment.findAll({
				where: { consultation_uuid: appointment.consultation_uuid },
			})
			await Promise.all(
				appointments_in_the_queue.map(appointment_in_queue =>
					appointment_in_queue.increment('rank')
				)
			)
			res.sendStatus(200)
		}
	} catch (e) {
		next(e)
	}
}

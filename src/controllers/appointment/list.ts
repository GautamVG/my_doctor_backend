import { Op } from 'sequelize'
import { type RequestHandler } from 'express'
import isUUID from 'validator/lib/isUUID'

import { QueryParamValidationOptions } from '../../types'

// Models
import Appointment from '../../models/appointment'

export const query_param_validation_options: QueryParamValidationOptions = [
	{
		name: 'at-consultation',
		optional: true,
		validations: [
			{
				passing: isUUID,
				failing_msg: 'The UUID is invalid',
			},
		],
	},
]

export const controller: RequestHandler = async (req, res) => {
	let filters: Record<string, any> = {}
	if (req.query.hasOwnProperty('at-consultation'))
		filters['consultation_uuid'] = req.query['at-consultation']

	const appointment = await Appointment.findAll({ where: filters })
	res.json(appointment)
}

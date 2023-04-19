import { type RequestHandler } from 'express'
import isUUID from 'validator/lib/isUUID'

import { QueryParamValidationOptions } from '../../types'

// Models
import Consultation from '../../models/consultation'

export const query_param_validation_options: QueryParamValidationOptions = [
	{
		name: 'at-clinic',
		optional: true,
		validations: [
			{
				passing: isUUID,
				failing_msg: 'The UUID is invalid',
			},
		],
	},
	{
		name: 'with-doctor',
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
	let filters: Record<string, string> = {}

	if (req.query.hasOwnProperty('at-clinic'))
		filters['clinic_uuid'] = req.query['at-clinic'] as string
	if (req.query.hasOwnProperty('with-doctor'))
		filters['doctor_uuid'] = req.query['with-doctor'] as string

	const consultations = await Consultation.findAll({
		where: filters,
	})
	res.json(consultations)
}

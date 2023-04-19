import { type RequestHandler } from 'express'
import isUUID from 'validator/lib/isUUID'

import { QueryParamValidationOptions } from '../../types'

// Models
import Doctor from '../../models/doctor'

export const query_param_validation_options: QueryParamValidationOptions = [
	{
		name: 'belongs-to-clinic',
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
	const doctors = await Doctor.findAll()
	res.json(doctors)
}

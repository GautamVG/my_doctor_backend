import { type RequestHandler } from 'express'
import isUUID from 'validator/lib/isUUID'

import { QueryParamValidationOptions } from '../../types'

// Models
import Clinic from '../../models/clinic'

export const query_param_validation_options: QueryParamValidationOptions = [
	{
		name: 'has-doctor',
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
	const clinics = await Clinic.findAll()
	res.json(clinics)
}

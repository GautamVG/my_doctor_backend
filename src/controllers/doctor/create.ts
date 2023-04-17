import { type RequestHandler } from 'express'
import isUUID from 'validator/lib/isUUID'

import { type QueryParamValidationOptions } from '../../types'

export const query_param_validation_options: QueryParamValidationOptions = [
	{
		name: 'uuid',
		optional: false,
		validations: [
			{
				passing: isUUID,
				failing_msg: 'The UUID is invalid',
			},
		],
	},
]

export const controller: RequestHandler = (req, res) => {
	res.json({ hello: 'world' })
}

import { type RequestHandler } from 'express'
import isUUID from 'validator/lib/isUUID'

import { type UrlParamValidationOptions } from '../../types'

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

export const controller: RequestHandler = (req, res) => {
	res.json({ hello: 'world' })
}

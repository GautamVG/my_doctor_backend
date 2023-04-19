import { type RequestHandler } from 'express'
import isUUID from 'validator/lib/isUUID'

import { type UrlParamValidationOptions } from '../../types'
import { ClientError } from '../../lib/errors'

// Models
import Consultation from '../../models/consultation'

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
		const consultation = await Consultation.findByPk(req.params.uuid)
		if (consultation == null) {
			const err = new ClientError(404, 'No consultation found')
			next(err)
		} else {
			consultation.update(req.body)
			res.json(consultation)
		}
	} catch (e) {
		next(e)
	}
}

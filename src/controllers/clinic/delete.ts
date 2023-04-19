import { type RequestHandler } from 'express'
import isUUID from 'validator/lib/isUUID'

import { type UrlParamValidationOptions } from '../../types'
import { ClientError } from '../../lib/errors'

// Models
import Clinic from '../../models/clinic'

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
		const clinic = await Clinic.findByPk(req.params.uuid)
		if (clinic == null) {
			const err = new ClientError(404, 'No clinic found')
			next(err)
		} else {
			clinic.destroy()
			res.sendStatus(200)
		}
	} catch (e) {
		next(e)
	}
}

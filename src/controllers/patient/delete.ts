import { type RequestHandler } from 'express'
import isUUID from 'validator/lib/isUUID'

import { type UrlParamValidationOptions } from '../../types'
import { ClientError } from '../../lib/errors'
import Patient from '../../models/patient'

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
		const patient = await Patient.findByPk(req.params.uuid)
		if (patient == null) {
			const err = new ClientError(404, 'No patient found')
			next(err)
		} else {
			patient.destroy()
			res.sendStatus(200)
		}
	} catch (e) {
		next(e)
	}
}

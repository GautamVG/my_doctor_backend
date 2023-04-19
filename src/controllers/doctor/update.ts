import { type RequestHandler } from 'express'
import isUUID from 'validator/lib/isUUID'

import { type UrlParamValidationOptions } from '../../types'
import Doctor from '../../models/doctor'
import { ClientError } from '../../lib/errors'

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
		const doctor = await Doctor.findByPk(req.params.uuid)
		if (doctor == null) {
			const err = new ClientError(404, 'No doctor found')
			next(err)
		} else {
			doctor.update(req.body)
			res.json(doctor)
		}
	} catch (e) {
		next(e)
	}
}

import { type RequestHandler } from 'express'
import { ClientError } from '../../lib/errors'
import { compareSync } from 'bcrypt'

// Models
import Patient from '../../models/patient'

import { type PatientLoginResponse } from '../../types'

export const controller: RequestHandler = async (req, res, next) => {
	const fields = ['email', 'password']
	fields.forEach(field => {
		if (!req.body.hasOwnProperty(field))
			next(new ClientError(401, `Specify ${field}`))
	})

	try {
		const patient = await Patient.findOne({
			where: {
				email: req.body.email,
			},
		})

		let response: PatientLoginResponse = {
			success: false,
			reason: 'EMAIL_NON_EXISTENT',
		}

		if (patient != null) {
			const hashed_pwd = patient.getDataValue('password')

			const match = compareSync(req.body.password, hashed_pwd)
			if (!match) response.reason = 'WRONG_PASS'
			else {
				response.success = true
				response.reason = undefined
				response.data = patient
			}
		}

		res.json(response)
	} catch (e) {
		next(e)
	}
}

import { type RequestHandler } from 'express'
import { ClientError } from '../../lib/errors'
import { compareSync } from 'bcrypt'

// Models
import Doctor from '../../models/doctor'

import { type DoctorLoginResponse } from '../../types'

export const controller: RequestHandler = async (req, res, next) => {
	const fields = ['email', 'password']
	fields.forEach(field => {
		if (!req.body.hasOwnProperty(field))
			next(new ClientError(401, `Specify ${field}`))
	})

	try {
		const doctor = await Doctor.findOne({
			where: {
				email: req.body.email,
			},
		})

		let response: DoctorLoginResponse = {
			success: false,
			reason: 'EMAIL_NON_EXISTENT',
		}

		if (doctor != null) {
			const hashed_pwd = doctor.getDataValue('password')

			const match = compareSync(req.body.password, hashed_pwd)
			if (!match) response.reason = 'WRONG_PASS'
			else {
				response.success = true
				response.reason = undefined
				response.data = doctor
			}
		}

		res.json(response)
	} catch (e) {
		next(e)
	}
}

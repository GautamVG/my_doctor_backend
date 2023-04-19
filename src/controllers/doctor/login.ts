import { type RequestHandler } from 'express'
import Doctor from '../../models/doctor'
import { ClientError } from '../../lib/errors'
import { compareSync } from 'bcrypt'

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

		if (doctor == null) next(new ClientError(404, 'Email not found'))
		else {
			const hashed_pwd = doctor.getDataValue('password')
			const match = compareSync(req.body.password, hashed_pwd)
			if (!match) next(new ClientError(402, 'Incorrect password'))
			else res.sendStatus(200)
		}
	} catch (e) {
		next(e)
	}
}

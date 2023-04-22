import { type RequestHandler } from 'express'

// Models
import Patient from '../../models/patient'

export const controller: RequestHandler = async (req, res, next) => {
	try {
		const patient = await Patient.create(req.body)
		res.json(patient)
	} catch (e) {
		next(e)
	}
}

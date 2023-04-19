import { type RequestHandler } from 'express'

// Models
import Doctor from '../../models/doctor'

export const controller: RequestHandler = async (req, res, next) => {
	console.log(req.body)
	try {
		const doctor = await Doctor.create(req.body)
		res.json(doctor)
	} catch (e) {
		next(e)
	}
}

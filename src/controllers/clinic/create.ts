import { type RequestHandler } from 'express'

// Models
import Clinic from '../../models/clinic'

export const controller: RequestHandler = async (req, res, next) => {
	try {
		const clinic = await Clinic.create(req.body)
		res.json(clinic)
	} catch (e) {
		next(e)
	}
}

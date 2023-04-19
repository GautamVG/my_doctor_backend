import { type RequestHandler } from 'express'

// Models
import Consultation from '../../models/consultation'

export const controller: RequestHandler = async (req, res, next) => {
	try {
		const consultation = await Consultation.create(req.body)
		res.json(consultation)
	} catch (e) {
		next(e)
	}
}

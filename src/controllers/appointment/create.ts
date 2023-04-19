import { type RequestHandler } from 'express'

// Models
import Appointment from '../../models/appointment'

export const controller: RequestHandler = async (req, res, next) => {
	try {
		const appointment = await Appointment.create(req.body)
		res.json(appointment)
	} catch (e) {
		next(e)
	}
}

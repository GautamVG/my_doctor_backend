import { HttpError } from './lib/errors'
import { type ErrorRequestHandler } from 'express'

const error_handler: ErrorRequestHandler = (err, req, res, next) => {
	if (err instanceof HttpError) {
		let response
		if (err.data) {
			response = {
				msg: err.msg,
				data: err.data,
			}
		} else {
			response = {
				msg: err.msg,
			}
		}
		res.status(err.code).json(response)
	} else
		res.status(500).json({
			msg: 'Internal server error. Contact admin.',
			data: err,
		})
}

export default error_handler

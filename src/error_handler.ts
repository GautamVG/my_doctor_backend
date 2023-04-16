import { HttpError } from './lib/errors'
import { type ErrorRequestHandler } from 'express'

const error_handler: ErrorRequestHandler = (err, req, res, next) => {
	if (err instanceof HttpError) res.status(err.code).json({ msg: err.msg })
	else res.status(500).json({ msg: 'Internal server error. Contact admin.' })
}

export default error_handler

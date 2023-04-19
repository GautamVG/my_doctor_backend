import { RequestHandler } from 'express'

// lib
import { ClientError } from '../lib/errors'

// types
import { UrlParamValidationOptions } from '../types'

function validate_url_params(options: UrlParamValidationOptions) {
	const middleware: RequestHandler = (req, res, next) => {
		// Validate url param
		let valid = true
		let validation_err_msgs: Record<string, Array<string>> = {}
		options.forEach(param => {
			const err_msgs = param.validations
				.filter(
					validation => !validation.passing(req.params[param.name])
				)
				.map(validation => validation.failing_msg)
			if (err_msgs.length != 0) {
				valid = false
				validation_err_msgs[param.name] = err_msgs
			}
		})

		if (!valid)
			throw new ClientError(
				400,
				'URL parameters were invalid',
				validation_err_msgs!
			)

		next()
	}

	return middleware
}

export default validate_url_params

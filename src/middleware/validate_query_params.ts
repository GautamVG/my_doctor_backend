import { RequestHandler } from 'express'

// lib
import { ClientError } from '../lib/errors'

// types
import { type QueryParamValidationOptions } from '../types'

function validate_query_params(options: QueryParamValidationOptions) {
	const middleware: RequestHandler = (req, res, next) => {
		// Check if all required params are present
		const missing_params = options
			.filter(
				option =>
					!option.optional && !req.params.hasOwnProperty(option.name)
			)
			.map(option => option.name)

		if (missing_params.length != 0)
			throw new ClientError(
				400,
				'Query parameters were missing',
				missing_params
			)

		// Validate all params
		let valid = true
		let validation_err_msgs: Record<string, Array<string>> = {}
		options.forEach(param => {
			if (!req.params.hasOwnProperty(param.name)) return
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
				'Query parameters were invalid',
				validation_err_msgs!
			)
	}

	return middleware
}

export default validate_query_params

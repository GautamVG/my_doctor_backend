import { Op } from 'sequelize'
import isUUID from 'validator/lib/isUUID'
import isBoolean from 'validator/lib/isBoolean'

// Models
import Patient from '../../models/patient'

// Types
import { type RequestHandler } from 'express'
import { type QueryParamValidationOptions } from '../../types'
import Appointment from '../../models/appointment'

export const query_param_validation_options: QueryParamValidationOptions = [
	{
		name: 'extended',
		optional: true,
		validations: [
			{
				passing: isBoolean,
				failing_msg: "Specify a boolean value for 'extended' query",
			},
		],
	},
]

export const controller: RequestHandler = async (req, res) => {
	let filters: Record<string, any> = {}
	let include_options: Record<string, any> | undefined

	if (req.query.hasOwnProperty('extended')) {
		include_options = [
			{
				model: Appointment,
			},
		]
	}

	const patients = await Patient.findAll({
		where: filters,
		include: include_options,
	})

	res.json(patients)
}

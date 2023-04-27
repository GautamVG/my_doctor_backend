import isBoolean from 'validator/lib/isBoolean'
import isUUID from 'validator/lib/isUUID'

// Models
import Appointment from '../../models/appointment'
import Consultation from '../../models/consultation'

// Types
import { QueryParamValidationOptions } from '../../types'
import { type RequestHandler } from 'express'
import Patient from '../../models/patient'

export const query_param_validation_options: QueryParamValidationOptions = [
	{
		name: 'at-consultation',
		optional: true,
		validations: [
			{
				passing: isUUID,
				failing_msg: 'The UUID is invalid',
			},
		],
	},
	{
		name: 'with-patient',
		optional: true,
		validations: [
			{
				passing: isUUID,
				failing_msg: 'The UUID is invalid',
			},
		],
	},
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

	if (req.query.hasOwnProperty('at-consultation'))
		filters['consultation_uuid'] = req.query['at-consultation']

	if (req.query.hasOwnProperty('with-patient'))
		filters['patient_uuid'] = req.query['with-patient']

	if (req.query.hasOwnProperty('extended'))
		include_options = [{ model: Consultation }, { model: Patient }]

	const appointment = await Appointment.findAll({
		where: filters,
		include: include_options,
	})
	res.json(appointment)
}

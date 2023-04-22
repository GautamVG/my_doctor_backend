import isUUID from 'validator/lib/isUUID'
import isBoolean from 'validator/lib/isBoolean'

// Models
import Consultation from '../../models/consultation'
import Appointment from '../../models/appointment'

// Types
import { QueryParamValidationOptions } from '../../types'
import { type RequestHandler } from 'express'

export const query_param_validation_options: QueryParamValidationOptions = [
	{
		name: 'at-clinic',
		optional: true,
		validations: [
			{
				passing: isUUID,
				failing_msg: 'The UUID is invalid',
			},
		],
	},
	{
		name: 'with-doctor',
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
	let filters: Record<string, string> = {}
	let include_options: Record<string, any> | undefined

	if (req.query.hasOwnProperty('at-clinic'))
		filters['clinic_uuid'] = req.query['at-clinic'] as string

	if (req.query.hasOwnProperty('with-doctor'))
		filters['doctor_uuid'] = req.query['with-doctor'] as string

	if (req.query.hasOwnProperty('extended'))
		include_options = [{ model: Appointment }]

	const consultations = await Consultation.findAll({
		where: filters,
		include: include_options,
	})

	res.json(consultations)
}

import { Op } from 'sequelize'
import isUUID from 'validator/lib/isUUID'
import isBoolean from 'validator/lib/isBoolean'

// Models
import Doctor from '../../models/doctor'
import Clinic from '../../models/clinic'
import Consultation from '../../models/consultation'

// Types
import { type RequestHandler } from 'express'
import { type QueryParamValidationOptions } from '../../types'

export const query_param_validation_options: QueryParamValidationOptions = [
	{
		name: 'has-doctor',
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

	if (req.query.hasOwnProperty('has-doctor')) {
		const consultations = await Consultation.findAll({
			attributes: ['clinic_uuid'],
			where: {
				doctor_uuid: req.query['has-doctor'],
			},
		})
		const clinic_uuids = consultations.map(consultation =>
			consultation.getDataValue('clinic_uuid')
		)

		filters['uuid'] = {
			[Op.in]: clinic_uuids,
		}
	}

	if (req.query.hasOwnProperty('extended')) {
		include_options = [
			{
				model: Doctor,
				through: {
					attributes: ['uuid', 'start_time', 'end_time'],
				},
			},
		]
	}

	const clinics = await Clinic.findAll({
		where: filters,
		include: include_options,
	})

	res.json(clinics)
}

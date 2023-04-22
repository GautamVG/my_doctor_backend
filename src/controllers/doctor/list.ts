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
		name: 'belongs-to-clinic',
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

	if (req.query.hasOwnProperty('belongs-to-clinic')) {
		const consultations = await Consultation.findAll({
			attributes: ['doctor_uuid'],
			where: {
				clinic_uuid: req.query['belongs-to-clinic'],
			},
		})

		const doctor_uuids = consultations.map(consultation =>
			consultation.getDataValue('doctor_uuid')
		)

		filters['uuid'] = {
			[Op.in]: doctor_uuids,
		}
	}

	if (req.query.hasOwnProperty('extended')) {
		include_options = [
			{
				model: Clinic,
				through: {
					attributes: ['uuid', 'start_time', 'end_time'],
				},
			},
		]
	}

	const doctors = await Doctor.findAll({
		where: filters,
		include: include_options,
	})

	res.json(doctors)
}

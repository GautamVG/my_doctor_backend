import { Op } from 'sequelize'
import { type RequestHandler } from 'express'
import isUUID from 'validator/lib/isUUID'

import { QueryParamValidationOptions } from '../../types'

// Models
import Doctor from '../../models/doctor'
import Consultation from '../../models/consultation'

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
]

export const controller: RequestHandler = async (req, res) => {
	let filters: Record<string, any> = {}

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

	const doctors = await Doctor.findAll({
		attributes: {
			exclude: ['password'],
		},
		where: filters,
	})
	res.json(doctors)
}

import { Op } from 'sequelize'
import { type RequestHandler } from 'express'
import isUUID from 'validator/lib/isUUID'

import { QueryParamValidationOptions } from '../../types'

// Models
import Clinic from '../../models/clinic'
import Consultation from '../../models/consultation'

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
]

export const controller: RequestHandler = async (req, res) => {
	let filters: Record<string, any> = {}

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

	const clinics = await Clinic.findAll({ where: filters })
	res.json(clinics)
}

import { CreationOptional, DataTypes, ForeignKey, Model } from 'sequelize'

import sequelize from './sequelize'
import Doctor from './doctor'
import Clinic from './clinic'

class Consultation extends Model {
	declare uuid: CreationOptional<string>
	declare doctor_uuid: ForeignKey<string>
	declare clinic_uuid: ForeignKey<string>
	declare start_time: string
	declare end_time: string
}

Consultation.init(
	{
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		doctor_uuid: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Doctor,
				key: 'uuid',
			},
		},
		clinic_uuid: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Clinic,
				key: 'uuid',
			},
		},
		start_time: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		end_time: {
			type: DataTypes.TIME,
			allowNull: false,
		},
	},
	{
		sequelize,
	}
)

export default Consultation

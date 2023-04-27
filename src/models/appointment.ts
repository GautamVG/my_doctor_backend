import {
	CreationOptional,
	DataTypes,
	ForeignKey,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize'

import sequelize from './sequelize'
import Consultation from './consultation'
import Patient from './patient'

class Appointment extends Model<
	InferAttributes<Appointment>,
	InferCreationAttributes<Appointment>
> {
	declare uuid: CreationOptional<string>
	declare consultation_uuid: string
	declare fcm_registration_token: string
	declare hypertrack_device_id: string
	declare eta: Date
	declare rank: number | null
	declare patient_uuid: ForeignKey<string>
}

Appointment.init(
	{
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		consultation_uuid: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Consultation,
				key: 'uuid',
			},
		},
		fcm_registration_token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		hypertrack_device_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		eta: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		rank: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		patient_uuid: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Patient,
				key: 'uuid',
			},
		},
	},
	{
		sequelize,
	}
)

export default Appointment

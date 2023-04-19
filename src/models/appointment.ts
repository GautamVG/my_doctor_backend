import { DataTypes, Model } from 'sequelize'

import sequelize from './sequelize'
import Consultation from './consultation'

class Appointment extends Model {}

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
		fcm_registration_key: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		hypertrack_device_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
	}
)

export default Appointment

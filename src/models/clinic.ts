import { DataTypes, Model } from 'sequelize'

import sequelize from './sequelize'
import Doctor from './doctor'
import Consultation from './consultation'

class Clinic extends Model {}

Clinic.init(
	{
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lat: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		long: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{
		sequelize,
	}
)

export default Clinic

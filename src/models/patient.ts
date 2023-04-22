import { DataTypes, Model } from 'sequelize'
import { hashSync } from 'bcrypt'

import sequelize from './sequelize'
import Clinic from './clinic'
import Consultation from './consultation'

class Patient extends Model {}

Patient.init(
	{
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(value: string) {
				const hashed_pwd = hashSync(value, 3)
				this.setDataValue('password', hashed_pwd)
			},
			get() {
				return 'hidden'
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		dob: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
	}
)

export default Patient

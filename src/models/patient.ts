import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize'
import { hashSync } from 'bcrypt'

import sequelize from './sequelize'

class Patient extends Model<
	InferAttributes<Patient>,
	InferCreationAttributes<Patient>
> {
	declare uuid: CreationOptional<string>
	declare email: string
	declare password: string
	declare name: string
	declare phone: string
	declare gender: string
	declare dob: string
}

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

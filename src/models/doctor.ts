import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize'
import { hashSync } from 'bcrypt'

import sequelize from './sequelize'

class Doctor extends Model<
	InferAttributes<Doctor>,
	InferCreationAttributes<Doctor>
> {
	declare uuid: CreationOptional<string>
	declare email: string
	declare password: string
	declare name: string
	declare photo: string
	declare medical_certificate: string
}

Doctor.init(
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
		photo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		medical_certificate: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
	}
)

export default Doctor

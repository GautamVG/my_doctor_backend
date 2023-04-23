import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize'

import sequelize from './sequelize'
import Doctor from './doctor'
import Consultation from './consultation'

class Clinic extends Model<
	InferAttributes<Clinic>,
	InferCreationAttributes<Clinic>
> {
	declare uuid: CreationOptional<string>
	declare name: string
	declare address: string
	declare lat: number
	declare long: number
}

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

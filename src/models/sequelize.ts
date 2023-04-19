import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('sqlite:db.db')

export async function initDB() {
	await sequelize.sync({ force: true })
}

export default sequelize

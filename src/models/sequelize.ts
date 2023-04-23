import { Sequelize } from 'sequelize'
import logger from '../lib/logger'

const sequelize = new Sequelize('sqlite:db.db', {
	logging: msg => logger.info(msg),
})

export default sequelize

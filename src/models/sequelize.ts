import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('sqlite:db.db')

export default sequelize

import dotenv from 'dotenv'
import server from './server'
import logger from './lib/logger'
import { initDB } from './models/sequelize'

// Loading environment variables
dotenv.config()

initDB()

const port = process.env.PORT || 80
server.listen(port)

logger.info(`Server started at port: ${port}`)

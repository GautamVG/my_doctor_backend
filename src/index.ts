import dotenv from 'dotenv'
import server from './server'
import logger from './lib/logger'
import { initDB } from './models/sequelize'
import { initializeApp, applicationDefault } from 'firebase-admin/app'

// Loading environment variables
dotenv.config()

// Initialize Firebase Admin SDK
initializeApp({ credential: applicationDefault() })

// Initialize connection to DB
initDB()

const port = process.env.PORT || 80
server.listen(port)

logger.info(`Server started at port: ${port}`)

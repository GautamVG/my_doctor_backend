import dotenv from 'dotenv'
dotenv.config()

import { initializeApp, applicationDefault } from 'firebase-admin/app'

import server from './server'
import logger from './lib/logger'
import * as db from './models'

// Initialize Firebase Admin SDK
initializeApp({ credential: applicationDefault() })

// Initialize DB
db.sync().then(db.populate)

const port = process.env.PORT || 80
server.listen(port)

logger.info(`Server started at port: ${port}`)

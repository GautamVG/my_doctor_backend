import dotenv from 'dotenv'
import server from './server'
import logger from './lib/logger'

// Loading environment variables
dotenv.config()

const port = process.env.PORT || 80

server.listen(port)

logger.info(`Server started at port: ${port}`)

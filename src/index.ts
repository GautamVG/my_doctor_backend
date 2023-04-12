import dotenv from 'dotenv'
import server from './server'

// Loading environment variables
dotenv.config()

const port = process.env.PORT || 80

server.listen(port)

console.info('Server started at port:', port)

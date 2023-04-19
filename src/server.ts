import http from 'http'
import express from 'express'
import cors from 'cors'

// Middleware
import log from './middleware/log'
import log_error from './middleware/log_error'

// Router and error handler
import router from './routes'
import error_handler from './error_handler'

// Express app instance
const app = express()

// CORS enabled for all hosts
app.use(cors())

// All request payloads are parsed as JSON
app.use(express.json({ limit: '50mb' }))

// Logging
app.use(log)

// Router
app.use(router)

// Error logging
app.use(log_error)

// Error handling
app.use(error_handler)

const server = http.createServer(app)

export default server

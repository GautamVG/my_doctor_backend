import http from 'http'
import express, { type Request, type Response } from 'express'
import cors from 'cors'

// Express app instance
const app = express()

// CORS enabled for all hosts
app.use(cors())

// All request payloads are parsed as JSON
app.use(express.json())

app.get('/', (req, res) => {
	res.json({
		hello: 'world!',
	})
})

app.get('*', (req, res) => {
	res.sendStatus(404)
})

const server = http.createServer(app)

export default server

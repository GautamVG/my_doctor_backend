import { type RequestHandler } from 'express'

export const controller: RequestHandler = (req, res) => {
	res.json({ hello: 'world' })
}

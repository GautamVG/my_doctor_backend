import { Router } from 'express'
import { ClientError } from './lib/errors'

const router = Router()

router.get('/', (req, res) => {
	res.json({
		hello: 'world!',
	})
})

router.get('*', (req, res) => {
	throw new ClientError(404, 'Route not found')
})

export default router

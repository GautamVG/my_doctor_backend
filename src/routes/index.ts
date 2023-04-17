import { Router } from 'express'

// Lib
import { ClientError } from '../lib/errors'
import doctor_router from './doctor'

const index_router = Router()

index_router.get('/', (req, res) => {
	res.json({
		hello: 'world!',
	})
})

index_router.use('/doctor', doctor_router)

index_router.get('*', (req, res) => {
	throw new ClientError(404, 'Route not found')
})

export default index_router

import { Router } from 'express'

// Lib
import { ClientError } from '../lib/errors'

// Routers
import doctor_router from './doctor'
import clinic_router from './clinic'
import consultation_router from './consultation'
import appointment_router from './appointment'

const index_router = Router()

index_router.use('/doctor', doctor_router)
index_router.use('/clinic', clinic_router)
index_router.use('/consultation', consultation_router)
index_router.use('/appointment', appointment_router)

index_router.get('*', (req, res) => {
	throw new ClientError(404, 'Route not found')
})

export default index_router

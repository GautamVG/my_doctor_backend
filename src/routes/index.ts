import { Router } from 'express'

// Lib
import { ClientError } from '../lib/errors'

// Routers
import doctor_router from './doctor'
import patient_router from './patient'
import clinic_router from './clinic'
import consultation_router from './consultation'
import appointment_router from './appointment'

// Controllers
import * as hypertrack_webhook from '../controllers/hypertrack_webhook'

const index_router = Router()

index_router.use('/doctor', doctor_router)
index_router.use('/patient', patient_router)
index_router.use('/clinic', clinic_router)
index_router.use('/consultation', consultation_router)
index_router.use('/appointment', appointment_router)
index_router.use('/hypertrack-webhook', hypertrack_webhook.controller)

index_router.get('*', (req, res) => {
	throw new ClientError(404, 'Route not found')
})

export default index_router

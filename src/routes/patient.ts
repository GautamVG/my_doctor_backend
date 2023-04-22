import { Router } from 'express'

// Middleware
import validate_query_params from '../middleware/validate_query_params'
import validate_url_params from '../middleware/validate_url_params'

// Controllers
import * as patient from '../controllers/patient'

const patient_router = Router()

patient_router.get(
	'/list',
	validate_query_params(patient.list.query_param_validation_options),
	patient.list.controller
)

patient_router.get(
	'/:uuid',
	validate_url_params(patient.read.url_param_validation_options),
	patient.read.controller
)

patient_router.post('/', patient.create.controller)

patient_router.put(
	'/:uuid',
	validate_url_params(patient.update.url_param_validation_options),
	patient.update.controller
)

patient_router.delete(
	'/:uuid',
	validate_url_params(patient.delete.url_param_validation_options),
	patient.delete.controller
)

patient_router.post('/login', patient.login.controller)
patient_router.post('/logout', patient.logout.controller)

export default patient_router

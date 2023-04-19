import { Router } from 'express'

// Middleware
import validate_query_params from '../middleware/validate_query_params'
import validate_url_params from '../middleware/validate_url_params'

// Controllers
import * as clinic from '../controllers/clinic'

const clinic_router = Router()

clinic_router.get(
	'/list',
	validate_query_params(clinic.list.query_param_validation_options),
	clinic.list.controller
)

clinic_router.get(
	'/:uuid',
	validate_url_params(clinic.read.url_param_validation_options),
	clinic.read.controller
)

clinic_router.post('/', clinic.create.controller)

clinic_router.put(
	'/:uuid',
	validate_url_params(clinic.update.url_param_validation_options),
	clinic.update.controller
)

clinic_router.delete(
	'/:uuid',
	validate_url_params(clinic.delete.url_param_validation_options),
	clinic.delete.controller
)

export default clinic_router

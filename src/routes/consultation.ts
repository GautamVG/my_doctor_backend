import { Router } from 'express'

// Middleware
import validate_query_params from '../middleware/validate_query_params'
import validate_url_params from '../middleware/validate_url_params'

// Controllers
import * as consultation from '../controllers/consultation'

const consultation_router = Router()

consultation_router.get(
	'/list',
	validate_query_params(consultation.list.query_param_validation_options),
	consultation.list.controller
)

consultation_router.get(
	'/:uuid',
	validate_url_params(consultation.read.url_param_validation_options),
	consultation.read.controller
)

consultation_router.post('/', consultation.create.controller)

consultation_router.put(
	'/:uuid',
	validate_url_params(consultation.update.url_param_validation_options),
	consultation.update.controller
)

consultation_router.delete(
	'/:uuid',
	validate_url_params(consultation.delete.url_param_validation_options),
	consultation.delete.controller
)

export default consultation_router

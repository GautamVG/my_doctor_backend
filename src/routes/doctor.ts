import { Router } from 'express'

// Middleware
import validate_query_params from '../middleware/validate_query_params'
import validate_url_params from '../middleware/validate_url_params'

// Controllers
import * as doctor from '../controllers/doctor'

const doctor_router = Router()

doctor_router.post(
	'/:uuid',
	validate_url_params(doctor.create.url_param_validation_options),
	doctor.create.controller
)

// doctor_router.get('/:uuid')

// doctor_router.post('/')

// doctor_router.put('/:uuid')

// doctor_router.delete('/:uuid')

export default doctor_router

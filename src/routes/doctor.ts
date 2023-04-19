import { Router } from 'express'

// Middleware
import validate_query_params from '../middleware/validate_query_params'
import validate_url_params from '../middleware/validate_url_params'

// Controllers
import * as doctor from '../controllers/doctor'

const doctor_router = Router()

doctor_router.get(
	'/list',
	validate_query_params(doctor.list.query_param_validation_options),
	doctor.list.controller
)

doctor_router.get(
	'/:uuid',
	validate_url_params(doctor.read.url_param_validation_options),
	doctor.read.controller
)

doctor_router.post('/', doctor.create.controller)

doctor_router.put(
	'/:uuid',
	validate_url_params(doctor.update.url_param_validation_options),
	doctor.update.controller
)

doctor_router.delete(
	'/:uuid',
	validate_url_params(doctor.delete.url_param_validation_options),
	doctor.delete.controller
)

doctor_router.post('/login', doctor.login.controller)
doctor_router.post('/logout', doctor.logout.controller)

export default doctor_router

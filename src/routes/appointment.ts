import { Router } from 'express'

// Middleware
import validate_query_params from '../middleware/validate_query_params'
import validate_url_params from '../middleware/validate_url_params'

// Controllers
import * as appointment from '../controllers/appointment'

const appointment_router = Router()

appointment_router.get(
	'/list',
	validate_query_params(appointment.list.query_param_validation_options),
	appointment.list.controller
)

appointment_router.get(
	'/:uuid',
	validate_url_params(appointment.read.url_param_validation_options),
	appointment.read.controller
)

appointment_router.post('/', appointment.create.controller)

appointment_router.put(
	'/:uuid',
	validate_url_params(appointment.update.url_param_validation_options),
	appointment.update.controller
)

appointment_router.delete(
	'/:uuid',
	validate_url_params(appointment.delete.url_param_validation_options),
	appointment.delete.controller
)

export default appointment_router

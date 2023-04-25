import path from 'path'
import winston, { type transport, transports, format } from 'winston'

// Utils
import { is_prod } from './utils'

const root = process.cwd()
const log_folder = 'logs'
const server_log_filename = 'server'
const error_log_filename = 'error'
const debug_log_filename = 'debug'
const extension = '.log'

const logger_level = is_prod() ? 'info' : 'debug'

const logger_format = format.combine(
	format.timestamp(),
	format.json({ space: 4 })
)

const logger_transports: Array<transport> = [
	new transports.File({
		level: 'error',
		filename: path.join(root, log_folder, error_log_filename + extension),
	}),
	new transports.Console({
		level: 'debug',
	}),
]

if (!is_prod()) {
	// logger_transports.push(
	// 	new transports.Console({
	// 		level: 'debug',
	// 	})
	// )
	logger_transports.push(
		new transports.File({
			level: 'debug',
			filename: path.join(
				root,
				log_folder,
				debug_log_filename + extension
			),
		})
	)
} else {
	logger_transports.push(
		new transports.File({
			level: 'info',
			filename: path.join(
				root,
				log_folder,
				server_log_filename + extension
			),
		})
	)
}

const logger = winston.createLogger({
	level: logger_level,
	format: logger_format,
	transports: logger_transports,
})

export default logger

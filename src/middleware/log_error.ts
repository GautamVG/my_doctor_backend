import expressWinston from 'express-winston'

// Lib
import logger from '../lib/logger'

const log_error = expressWinston.errorLogger({
	winstonInstance: logger,
	level: (req, res) => {
		if (res.statusCode < 400) return 'info'
		if (res.statusCode < 500) return 'warn'
		return 'error'
	},
})

export default log_error

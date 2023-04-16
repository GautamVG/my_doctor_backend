import expressWinston from 'express-winston'

// Lib
import logger from '../lib/logger'

const log = expressWinston.logger({
	winstonInstance: logger,
	statusLevels: false,
	level: (req, res) => {
		if (res.statusCode < 400) return 'info'
		if (res.statusCode < 500) return 'warn'
		return 'error'
	},
})

export default log

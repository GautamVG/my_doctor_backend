import { getMessaging } from 'firebase-admin/messaging'
import logger from './logger'

async function fcm_send_msg(data: any, token: string) {
	const msg = { data, token }

	try {
		await getMessaging().send(msg)
		logger.debug('Sent msg: ' + msg)
		return true
	} catch (e) {
		logger.error('Could not send msg: ' + JSON.stringify(e))
		return false
	}
}

export default fcm_send_msg

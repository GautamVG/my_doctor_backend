import { getMessaging } from 'firebase-admin/messaging'
import logger from './logger'

async function fcm_send_msg(data: any, token: string) {
	const msg = {
		data: {
			subtitle: JSON.stringify(data),
		},
		priority: 'high',
		token,
	}

	const msg_with_notification = {
		...msg,
		notification: {
			title: 'Your appointment from MyDoctor',
			body: `You should leave at ${data.etd}`,
		},
	}

	try {
		await getMessaging().send(msg)
		// await getMessaging().send(msg_with_notification)
		logger.debug('Sent msg: ' + JSON.stringify(msg))
		// logger.debug(
		// 	'Sent notification msg: ' + JSON.stringify(msg_with_notification)
		// )
		return true
	} catch (e) {
		logger.error('Could not send msg: ' + JSON.stringify(e))
		return false
	}
}

export default fcm_send_msg

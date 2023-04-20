import { getMessaging } from 'firebase-admin/messaging'

async function fcm_send_msg(data: any, token: string) {
	const msg = { data, token }

	try {
		await getMessaging().send(msg)
		return true
	} catch (e) {
		return false
	}
}

export default fcm_send_msg

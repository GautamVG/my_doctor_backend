import logger from './logger'

const auth = [
	'Basic',
	Buffer.from(
		`${process.env.HYPERTRACK_ACCOUNT_ID}:${process.env.HYPERTRACK_SECRET_KEY}`
	).toString('base64'),
].join(' ')

export async function start_device_tracking(device_id: string) {
	try {
		const res = await fetch(
			`https://v3.api.hypertrack.com/devices/${device_id}/start`,
			{
				method: 'POST',
				headers: {
					Authorization: auth,
				},
			}
		)
		return await res.json()
	} catch (e) {
		logger.error('Could not start device tracking ' + JSON.stringify(e))
		throw e
	}
}

// export async function create_driver(device_id: string, order_handle: string) {
// 	const payload = {
// 		driver_handle: device_id,
// 		ops_group_label: order_handle,
// 		device_id: device_id,
// 	}

// 	try {
// 		const res = await fetch(`https://v3.api.hypertrack.com/ops-groups`, {
// 			method: 'POST',
// 			headers: {
// 				Authorization: auth,
// 			},
// 			body: JSON.stringify(payload),
// 		})
// 		return await res.json()
// 	} catch (e) {
// 		logger.error('Could not create ops group ' + JSON.stringify(e))
// 		throw e
// 	}
// }

export async function create_ops_group(order_handle: string) {
	const payload = {
		ops_group_handle: order_handle,
		ops_group_label: order_handle,
		route_start_location: 'live_location',
		route_completion_type: 'end_at_last_order',
	}

	try {
		const res = await fetch(`https://v3.api.hypertrack.com/ops-groups`, {
			method: 'POST',
			headers: {
				Authorization: auth,
			},
			body: JSON.stringify(payload),
		})
		return await res.json()
	} catch (e) {
		logger.error('Could not create ops group ' + JSON.stringify(e))
		throw e
	}
}

export async function estimate_order(
	device_id: string,
	order_handle: string,
	destination: [number, number]
) {
	const payload = {
		ops_group_handle: order_handle,
		device_id,
		orders: [
			{
				order_handle,
				scheduled_at: '2023-05-29T23:50:00Z',
				destination: {
					geometry: {
						type: 'Point',
						coordinates: destination,
					},
					radius: 20,
				},
			},
		],
	}

	try {
		const res = await fetch(
			`https://v3.api.hypertrack.com/orders/estimate`,
			{
				method: 'POST',
				headers: {
					Authorization: auth,
				},
				body: JSON.stringify(payload),
			}
		)
		return await res.json()
	} catch (e) {
		logger.error('Could not estimate order ' + JSON.stringify(e))
		throw e
	}
}

export async function start_order_tracking(
	device_id: string,
	order_handle: string,
	destination: [number, number]
) {
	const payload = {
		device_id,
		track_mode: 'on_time',
		orders: [
			{
				order_handle,
				scheduled_at: '2023-05-29T23:50:00Z',
				destination: {
					geometry: {
						type: 'Point',
						coordinates: destination,
					},
					radius: 20,
				},
			},
		],
	}

	try {
		const res = await fetch('https://v3.api.hypertrack.com/orders/track', {
			method: 'POST',
			headers: {
				Authorization: auth,
			},
			body: JSON.stringify(payload),
		})
		return await res.json()
	} catch (e) {
		logger.error('Could not start order tracking ' + JSON.stringify(e))
		throw e
	}
}

export async function create_trip(
	device_id: string,
	order_id: string,
	destination: [number, number]
) {
	const payload = {
		device_id,
		orders: [
			{
				order_id,
				route: 'fixed',
				destination: {
					geometry: {
						type: 'Point',
						coordinates: destination,
					},
					radius: 30,
				},
			},
		],
	}

	try {
		const res = await fetch(`https://v3.api.hypertrack.com/trips`, {
			method: 'POST',
			headers: {
				Authorization: auth,
			},
			body: JSON.stringify(payload),
		})
		return await res.json()
	} catch (e) {
		logger.error('Could not create trip ' + JSON.stringify(e))
		throw e
	}
}

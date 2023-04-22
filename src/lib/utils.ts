export function is_prod() {
	const NODE_ENV = process.env.NODE_ENV?.trim() || 'dev'
	return NODE_ENV == 'prod'
}

export function estimate_leaving_time(travel_duration: number, eta: number) {
	const buffer_duration = 10 * 60
	let waiting_duration = 0
	if (waiting_duration + buffer_duration + travel_duration < eta)
		waiting_duration = buffer_duration + travel_duration - eta
	return waiting_duration + buffer_duration + travel_duration
}

export function is_prod() {
	const NODE_ENV = process.env.NODE_ENV?.trim() || 'dev'
	return NODE_ENV == 'prod'
}

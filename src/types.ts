export interface QueryParamValidationRule {
	passing: (...params: any) => boolean
	failing_msg: string
}

export type QueryParamValidationOptions = Array<{
	name: string
	optional: boolean
	validations: Array<QueryParamValidationRule>
}>

export interface UrlParamValidationRule extends QueryParamValidationRule {}

export type UrlParamValidationOptions = Array<{
	name: string
	validations: Array<UrlParamValidationRule>
}>

export interface DoctorLoginResponse {
	success: boolean
	reason?: 'EMAIL_NON_EXISTENT' | 'WRONG_PASS'
}

export interface QueueStatus {
	// all fields are numbers that need to parsed from strings
	size: string
	position: string
	leave_in: string // time duration in seconds
	eta: string // time duration in seconds
}

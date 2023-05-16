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
	data?: any // Doctor interface
}

export interface PatientLoginResponse {
	success: boolean
	reason?: 'EMAIL_NON_EXISTENT' | 'WRONG_PASS'
	data?: any // Patient interface
}

export interface QueueStatus {
	size: number
	position: number
	etd: string // Time in format "hh:mm:ss"
	eta: string // Time in format "hh:mm:ss"
}

export interface FCMMessage {
	status: 'scheduled' | 'cancelled'
	size?: string
	position?: string
	etd?: string // Time in format "hh:mm:ss"
	eta?: string // Time in format "hh:mm:ss"
	share_url?: string
}

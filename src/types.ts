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

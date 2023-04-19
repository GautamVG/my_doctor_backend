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

export interface QueryParamValidationRule {
	passing: (...params: any) => boolean
	failing_msg: string
}

export type QueryParamValidationOptions = Array<{
	name: string
	optional: boolean
	validations: Array<QueryParamValidationRule>
}>

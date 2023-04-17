export class HttpError {
	code: number
	msg: string
	data?: Object

	constructor(code: number, msg: string, data?: Object) {
		this.code = code
		this.msg = msg
		this.data = data
	}
}

export class InternalServerError extends HttpError {
	constructor(code: number, msg: string, data?: Object) {
		super(code, msg, data)
	}
}

export class ClientError extends HttpError {
	constructor(code: number, msg: string, data?: Object) {
		super(code, msg, data)
	}
}

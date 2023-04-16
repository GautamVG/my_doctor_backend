export class HttpError {
	code: number
	msg: string

	constructor(code: number, msg: string) {
		this.code = code
		this.msg = msg
	}
}

export class InternalServerError extends HttpError {
	constructor(code = 500, msg: string) {
		super(code, msg)
	}
}

export class ClientError extends HttpError {
	constructor(code = 404, msg: string) {
		super(code, msg)
	}
}

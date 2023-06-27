export class ServerException extends Error {
	status: number

	constructor(status: number, message: string) {
		super(message)
		this.status = status
	}
}

export class BadRequest extends ServerException {
	constructor(message: string) {
		super(400, message)
	}
}

export class NotFound extends ServerException {
	constructor(message: string) {
		super(404, message)
	}
}

export class InternalServerError extends ServerException {
	constructor(message: string) {
		super(500, message)
	}
}

import {ServerException} from '@/server/ServerException'

export class ServerExceptionFactory {
	static badRequest(message: string): ServerException {
		return new ServerException(400, message)
	}

	static notFound(message: string): ServerException {
		return new ServerException(404, message)
	}

	static internalServerError(message: string): ServerException {
		return new ServerException(500, message)
	}
}

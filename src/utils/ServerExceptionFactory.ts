import {ServerException} from '@/utils/ServerException'

export class ServerExceptionFactory {
	static badRequest(message: string): ServerException {
		return new ServerException(400, message)
	}

	static internalServerError(message: string): ServerException {
		return new ServerException(500, message)
	}
}

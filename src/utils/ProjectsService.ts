import {MongoClient} from 'mongodb'

import {ServerExceptionFactory} from '@/utils/ServerExceptionFactory'
import {Project} from '@/utils/types/Project'

export class ProjectService {
	static async getAllProjects(): Promise<Project[]> {
		if (!process.env.MONGO_URI || !process.env.MONGO_DB_NAME) {
			throw ServerExceptionFactory.internalServerError('Внутренняя ошибка сервера')
		}

		const client = new MongoClient(process.env.MONGO_URI)
		await client.connect()

		try {
			const database = client.db(process.env.MONGO_DB_NAME)
			const projects = await database.collection('project').find()
			return await projects.toArray() as unknown as Project[]
		} finally {
			await client.close()
		}
	}
}

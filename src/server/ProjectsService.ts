import {MongoClient} from 'mongodb'

import {ServerExceptionFactory} from '@/server/ServerExceptionFactory'
import {Project} from '@/utils/types/Project'

export class ProjectService {
	static async getAllProjects(page: number, projectsPerPage: number): Promise<Project[]> {
		if (!process.env.MONGO_URI || !process.env.MONGO_DB_NAME) {
			throw ServerExceptionFactory.internalServerError('Внутренняя ошибка сервера')
		}

		const client = new MongoClient(process.env.MONGO_URI)
		await client.connect()

		try {
			const database = client.db(process.env.MONGO_DB_NAME)
			const collection = database.collection('project')

			const projects = await collection
				.find()
				.skip(projectsPerPage * (page - 1))
				.limit(projectsPerPage)
				.toArray()

			return projects as unknown as Project[]
		} finally {
			await client.close()
		}
	}
}

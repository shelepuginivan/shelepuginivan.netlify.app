import {MongoClient} from 'mongodb'

import {Project} from '@/utils/types/Project'

export class ProjectService {
	static async getAllProjects(): Promise<Project[]> {
		const client = new MongoClient(process.env.MONGO_URI)
		await client.connect()

		try {
			const database = client.db(process.env.MONGO_DB_NAME)
			const projects = await database.collection('project').find()
			return await projects.toArray() as Project[]
		} finally {
			await client.close()
		}
	}
}

import {MongoClient} from 'mongodb'

export class GalleryService {
	static async getCategories(): Promise<string[]> {
		const client = new MongoClient(process.env.MONGO_URI)
		await client.connect()

		const database = client.db(process.env.MONGO_DB_NAME)

		try {
			return await database.collection('gallery').distinct('category')
		} finally {
			await client.close()
		}
	}
}

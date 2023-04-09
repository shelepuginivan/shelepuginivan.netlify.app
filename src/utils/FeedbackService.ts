import {MongoClient} from 'mongodb'

export class FeedbackService {
	static async sendFeedback(
		firstname: string,
		lastname: string,
		email: string,
		feedback: string,
	): Promise<void> {
		const client = new MongoClient(process.env.MONGO_URI as string)
		await client.connect()

		try {
			const database = client.db(process.env.MONGO_DB_NAME as string)

			await database.collection('feedback').insertOne({
				firstname, lastname, email, feedback
			})
		} finally {
			await client.close()
		}
	}
}

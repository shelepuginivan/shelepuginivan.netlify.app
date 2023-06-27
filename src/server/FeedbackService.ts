import { MongoClient } from 'mongodb'

import { InternalServerError } from '@/server/ServerException'
import { Feedback } from '@/utils/types/Feedback'

export class FeedbackService {
	static async sendFeedback(feedback: Feedback): Promise<void> {
		if (!process.env.MONGO_URI || !process.env.MONGO_DB_NAME) {
			throw new InternalServerError('Внутренняя ошибка сервера')
		}

		const client = new MongoClient(process.env.MONGO_URI)
		
		try {
			const database = client.db(process.env.MONGO_DB_NAME)
			const collection = database.collection('feedback')
			
			await collection.insertOne(feedback)
		} finally {
			await client.close()
		}
	}
}

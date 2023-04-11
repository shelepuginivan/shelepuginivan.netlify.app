import mongoose, {Mongoose} from 'mongoose'

import Feedback from '@/server/models/Feedback'
import {ServerExceptionFactory} from '@/server/ServerExceptionFactory'

export class FeedbackService {
	static async sendFeedback(
		firstname: string,
		lastname: string,
		email: string,
		feedback: string,
	): Promise<void> {
		if (!process.env.MONGO_URI || !process.env.MONGO_DB_NAME)
			throw ServerExceptionFactory.internalServerError('Внутренняя ошибка сервера')

		let connection: Mongoose

		try {
			connection = await mongoose.connect(process.env.MONGO_URI, {
				dbName: process.env.MONGO_DB_NAME
			})

			await Feedback.create({
				firstname,
				lastname,
				email,
				feedback
			})
		} finally {
			await connection?.disconnect?.()
		}
	}
}

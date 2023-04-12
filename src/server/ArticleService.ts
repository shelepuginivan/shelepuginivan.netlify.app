import {MongoClient} from 'mongodb'

import {ServerExceptionFactory} from '@/server/ServerExceptionFactory'
import {Article} from '@/utils/types/Article'

export class ArticleService {
	static async getAllArticles(page: number, articlesPerPage: number): Promise<Omit<Article, 'text'>[]> {
		if (!process.env.MONGO_URI || !process.env.MONGO_DB_NAME) {
			throw ServerExceptionFactory.internalServerError('Внутренняя ошибка сервера')
		}

		const client = new MongoClient(process.env.MONGO_URI)
		await client.connect()

		try {
			const database = client.db(process.env.MONGO_DB_NAME)
			const collection = await database.collection('article')
			const allArticles = await collection
				.find()
				.skip((page - 1) * articlesPerPage)
				.limit(articlesPerPage)
				.sort('publicationTime', 'descending')
				.toArray()

			return allArticles.map(article => {
				const {title, slug, publicationTime, previewUrl } = article as unknown as Article

				return {
					title,
					slug,
					publicationTime,
					previewUrl
				}
			})
		} finally {
			await client.close()
		}
	}

	static async getArticleBySlug(articleSlug: string): Promise<Article> {
		if (!process.env.MONGO_URI || !process.env.MONGO_DB_NAME) {
			throw ServerExceptionFactory.internalServerError('Внутренняя ошибка сервера')
		}
		
		const client = new MongoClient(process.env.MONGO_URI)
		await client.connect()

		try {
			const database = client.db(process.env.MONGO_DB_NAME)
			const article = await database.collection('article').findOne({slug: articleSlug})
			
			if (!article)
				throw ServerExceptionFactory.notFound('Статья не найдена')

			const {title, previewUrl, publicationTime, slug, text} = article

			return {
				title,
				previewUrl,
				publicationTime,
				slug,
				text
			}
		} finally {
			await client.close()
		}
	}

	static async getSlugs(): Promise<string[]> {
		if (!process.env.MONGO_URI || !process.env.MONGO_DB_NAME) {
			throw ServerExceptionFactory.internalServerError('Внутренняя ошибка сервера')
		}

		const client = new MongoClient(process.env.MONGO_URI)
		await client.connect()

		try {
			const database = client.db(process.env.MONGO_DB_NAME)
			const collection = await database.collection('article')

			return await collection.distinct('slug')
		} finally {
			await client.close()
		}
	}
}

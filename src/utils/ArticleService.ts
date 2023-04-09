import {MongoClient} from 'mongodb'

import {Article} from '@/utils/types/Article'

export class ArticleService {
	static async getAllArticles(page: number, articlesPerPage: number): Promise<Omit<Article, 'text'>[]> {
		const client = new MongoClient(process.env.MONGO_URI as string)
		await client.connect()

		try {
			const database = client.db(process.env.MONGO_DB_NAME as string)
			const collection = await database.collection('article')
			const allArticles = await collection
				.find()
				.skip((page - 1) * articlesPerPage)
				.limit(articlesPerPage)
				.sort('publicationDate', 'descending')
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
}

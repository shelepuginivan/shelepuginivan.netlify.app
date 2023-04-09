import {MongoClient} from 'mongodb'

import {Article} from '@/utils/types/Article'

export class ArticleService {
	static async getAllArticles(): Promise<Omit<Article, 'text'>[]> {
		const client = new MongoClient(process.env.MONGO_URI as string)
		await client.connect()

		try {
			const database = client.db(process.env.MONGO_DB_NAME as string)
			
			const allArticles = await database.collection('article').find().toArray()
			
			return allArticles.map(article => {
				const {title, slug, publicationDate, previewUrl } = article as unknown as Article
				
				return {
					title,
					slug,
					publicationDate,
					previewUrl
				}
			})
		} finally {
			await client.close()
		}
	}
}

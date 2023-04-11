import {MongoClient} from 'mongodb'

import {ServerExceptionFactory} from '@/server/ServerExceptionFactory'
import {randomItem} from '@/utils/randomItem'
import {Image} from '@/utils/types/Image'

export class GalleryService {
	static async getCategories(): Promise<string[]> {
		const client = new MongoClient(process.env.MONGO_URI as string)
		await client.connect()

		const database = client.db(process.env.MONGO_DB_NAME as string)

		try {
			return await database.collection('gallery').distinct('category')
		} finally {
			await client.close()
		}
	}

	static async getGalleryItemsByCategory(category: string): Promise<Image[]> {
		const client = new MongoClient(process.env.MONGO_URI as string)
		await client.connect()

		try {
			const database = client.db(process.env.MONGO_DB_NAME as string)
			const galleryItems = await database.collection('gallery').find({category})

			if (!galleryItems) {
				throw ServerExceptionFactory.badRequest(`Категория ${category} не найдена`)
			}

			return await galleryItems.toArray() as unknown as Image[]
		} finally {
			await client.close()
		}
	}

	static async getRandomImageUrlByCategory(category: string): Promise<string> {
		const galleryItems = await GalleryService.getGalleryItemsByCategory(category)

		return randomItem(galleryItems).url
	}
}

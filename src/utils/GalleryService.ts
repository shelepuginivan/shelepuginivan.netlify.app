import {MongoClient} from 'mongodb'

import {GalleryItem} from '@/utils/types/GalleryItem'

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

	static async getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
		const client = new MongoClient(process.env.MONGO_URI)
		await client.connect()

		const database = client.db(process.env.MONGO_DB_NAME)

		try {
			const galleryItems = await database.collection('gallery').find({category})

			return await galleryItems.toArray() as GalleryItem[]
		} finally {
			await client.close()
		}
	}
}

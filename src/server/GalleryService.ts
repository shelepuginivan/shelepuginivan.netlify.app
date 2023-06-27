import { MongoClient, WithId } from 'mongodb'

import { InternalServerError, NotFound } from '@/server/ServerException'
import { Image } from '@/utils/types/Image'

export class GalleryService {
	static async getCategories(): Promise<string[]> {
		if (!process.env.MONGO_URI || !process.env.MONGO_DB_NAME) {
			throw new InternalServerError('Внутренняя ошибка сервера')
		}

		const client = new MongoClient(process.env.MONGO_URI)
		await client.connect()

		const database = client.db(process.env.MONGO_DB_NAME)

		try {
			return await database.collection('image').distinct('category')
		} finally {
			await client.close()
		}
	}

	static async getGalleryItemsByCategory(
		category: string,
		page: number,
		imagesPerPage: number
	): Promise<string[]> {
		if (!process.env.MONGO_URI || !process.env.MONGO_DB_NAME) {
			throw new InternalServerError('Внутренняя ошибка сервера')
		}

		const client = new MongoClient(process.env.MONGO_URI)
		await client.connect()

		try {
			const database = client.db(process.env.MONGO_DB_NAME)
			const collection = database.collection('image')

			const galleryItems = await collection
				.find({ category })
				.skip(imagesPerPage * (page - 1))
				.limit(imagesPerPage)
				.toArray() as WithId<Image>[]

			if (!galleryItems) {
				throw new NotFound(`Категория ${category} не найдена`)
			}

			return galleryItems.map(item => item.url)
		} finally {
			await client.close()
		}
	}

	static async getRandomImageUrlByCategory(category: string): Promise<string> {
		if (!process.env.MONGO_URI || !process.env.MONGO_DB_NAME) {
			throw new InternalServerError('Внутренняя ошибка сервера')
		}

		const client = new MongoClient(process.env.MONGO_URI)
		await client.connect()

		try {
			const database = client.db(process.env.MONGO_DB_NAME)
			const collection = database.collection('image')

			const image = collection.aggregate([
				{
					$match: {
						category
					}
				},
				{
					$sample: {
						size: 1
					}
				}
			])

			const imageDocument = await image.next()

			if (!imageDocument || !imageDocument.url) {
				throw new NotFound(`категория ${category} не найдена`)
			}

			return imageDocument.url
		} finally {
			await client.close()
		}
	}
}

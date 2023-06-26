import { NextApiRequest, NextApiResponse } from 'next'

import { GalleryService } from '@/server/GalleryService'
import { ServerException } from '@/server/ServerException'
import { GalleryCategory } from '@/utils/types/GalleryCategory'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const categories = await GalleryService.getCategories()
		const categoriesWithPreview: GalleryCategory[] = []

		for (let i = 0; i < categories.length; i++) {
			const name = categories[i]

			const category: GalleryCategory = {
				previewUrl: await GalleryService.getRandomImageUrlByCategory(name),
				name
			}

			categoriesWithPreview.push(category)
		}

		res.status(200).json(categoriesWithPreview)
	} catch (error) {
		if (error instanceof ServerException) {
			res.status(error.status).json({ message: error.message })
		} else {
			res.status(500).json({ message: 'Внутренняя ошибка сервера' })
		}
	}
	
}

export default handler

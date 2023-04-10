import {NextApiRequest, NextApiResponse} from 'next'

import {GalleryService} from '@/utils/GalleryService'
import {ServerException} from '@/utils/ServerException'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const {category} = req.query

	if (typeof category !== 'string') {
		res.status(400).json({
			message: 'Некорректное значение параметра category'
		})

		return
	}

	try {
		const galleryItems = await GalleryService.getGalleryItemsByCategory(category)

		res.status(200).json(galleryItems)
	} catch (e) {
		if (e instanceof ServerException) {
			res.status(e.status).json({message: e.message})
		} else {
			res.status(500).json({message: 'Внутренняя ошибка сервера'})
		}
	}

}

export default handler

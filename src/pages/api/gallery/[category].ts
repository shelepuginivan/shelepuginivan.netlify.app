import {NextApiRequest, NextApiResponse} from 'next'

import {GalleryService} from '@/utils/GalleryService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const {category} = req.query

	if (typeof category !== 'string') {
		res.status(400).json({
			message: 'Некорректное значение параметра category'
		})

		return
	}

	const galleryItems = await GalleryService.getGalleryItemsByCategory(category)

	res.status(200).json(galleryItems)
}

export default handler

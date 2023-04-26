import {NextApiRequest, NextApiResponse} from 'next'

import {GalleryService} from '@/server/GalleryService'
import {ServerException} from '@/server/ServerException'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const category = req.query.category
	let {page, imagesPerPage} = req.query

	if (typeof category !== 'string') {
		res.status(400).json({
			message: 'Некорректное значение параметра category'
		})

		return
	}

	if (!page || typeof page !== 'string')
		page = '1'

	if (!imagesPerPage || typeof imagesPerPage !== 'string')
		imagesPerPage = '10'

	try {
		const galleryItems = await GalleryService.getGalleryItemsByCategory(
			category,
			Number(page),
			Number(imagesPerPage)
		)

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

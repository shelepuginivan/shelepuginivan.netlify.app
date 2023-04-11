import {NextApiRequest, NextApiResponse} from 'next'

import {GalleryService} from '@/server/GalleryService'
import {ServerException} from '@/server/ServerException'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const allCategories = await GalleryService.getCategories()

		res.status(200).json(allCategories)
	} catch (e) {
		if (e instanceof ServerException) {
			return res.status(e.status).json({message: e.message})
		}

		if (e instanceof Error) {
			return res.status(500).json({message: e.message})
		}

		res.status(500).json({message: 'Внутренняя ошибка сервера'})
	}
}

export default handler

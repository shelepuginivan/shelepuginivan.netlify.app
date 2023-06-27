import { NextApiRequest, NextApiResponse } from 'next'

import { ArticleService } from '@/server/ArticleService'
import { ServerException } from '@/server/ServerException'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const allSlugs = await ArticleService.getSlugs()
		
		res.status(200).json(allSlugs)
	} catch (error) {
		if (error instanceof ServerException) {
			res.status(error.status).json({ message: error.message })
		} else {
			res.status(500).json({ message: 'Внутренняя ошибка сервера' })
		}
	}
}

export default handler

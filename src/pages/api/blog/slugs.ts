import {NextApiRequest, NextApiResponse} from 'next'

import {ArticleService} from '@/utils/ArticleService'
import {ServerException} from '@/utils/ServerException'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const allSlugs = await ArticleService.getSlugs()
		
		res.status(200).json(allSlugs)
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

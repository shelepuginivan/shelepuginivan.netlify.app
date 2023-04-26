import {NextApiRequest, NextApiResponse} from 'next'

import {ArticleService} from '@/server/ArticleService'
import {ServerException} from '@/server/ServerException'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const page = Number(req.query.page) || 1
	const articlesPerPage = Number(req.query.articlesPerPage) || 10

	try {
		const articlesOnThisPage = await ArticleService.getAllArticles(page, articlesPerPage)

		res.status(200).json(articlesOnThisPage)
	} catch (e) {
		if (e instanceof ServerException) {
			res.status(e.status).json({message: e.message})
		} else {
			res.status(500).json({message: 'Внутренняя ошибка сервера'})
		}
	}
}

export default handler

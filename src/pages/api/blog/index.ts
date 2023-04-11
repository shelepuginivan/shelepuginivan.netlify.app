import {NextApiRequest, NextApiResponse} from 'next'

import {ArticleService} from '@/server/ArticleService'
import {ServerException} from '@/server/ServerException'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let {page, articlesPerPage} = req.query

	if (!page || typeof page !== 'string')
		page = '1'

	if (!articlesPerPage || typeof articlesPerPage !== 'string')
		articlesPerPage = '10'

	try {
		const articlesOnThisPage = await ArticleService.getAllArticles(
			Number(page),
			Number(articlesPerPage)
		)

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

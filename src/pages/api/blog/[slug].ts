import {NextApiRequest, NextApiResponse} from 'next'

import {ArticleService} from '@/server/ArticleService'
import {ServerException} from '@/server/ServerException'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const {slug} = req.query

	if (typeof slug !== 'string') {
		res.status(400).json({
			message: 'Некорректное значение параметра slug'
		})
		return
	}

	try {
		const article = await ArticleService.getArticleBySlug(slug)

		res.status(200).json(article)
	} catch (e) {
		if (e instanceof ServerException) {
			res.status(e.status).json({message: e.message})
		} else {
			res.status(500).json({message: 'Внутренняя ошибка сервера'})
		}
	}

}

export default handler

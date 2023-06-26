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
		const {text, title} = await ArticleService.getArticleBySlug(slug)
		const filename = `${encodeURIComponent(title).trim()}.md`

		res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
		res.setHeader('Content-Disposition', `attachment; filename=${filename}`)

		res.send(text)
	} catch (error) {
		if (error instanceof ServerException) {
			res.status(error.status).json({message: error.message})
		} else {
			res.status(500).json({message: 'Внутренняя ошибка сервера'})
		}
	}
}

export default handler

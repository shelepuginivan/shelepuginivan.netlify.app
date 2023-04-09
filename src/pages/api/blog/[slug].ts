import {NextApiRequest, NextApiResponse} from 'next'

import {ArticleService} from '@/utils/ArticleService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const {slug} = req.query

	if (typeof slug !== 'string') {
		res.status(400).json({
			message: 'Некорректное значение параметра slug'
		})
		return
	}
	
	const article = await ArticleService.getArticleBySlug(slug)
	
	res.status(200).json(article)
}

export default handler

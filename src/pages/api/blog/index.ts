import {NextApiRequest, NextApiResponse} from 'next'

import {ArticleService} from '@/utils/ArticleService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let {page, articlesPerPage} = req.query

	if (!page || typeof page !== 'string')
		page = '1'

	if (!articlesPerPage || typeof articlesPerPage !== 'string')
		articlesPerPage = '10'

	const articlesOnThisPage = await ArticleService.getAllArticles(
		Number(page),
		Number(articlesPerPage)
	)
	
	res.status(200).json(articlesOnThisPage)
}

export default handler

import {NextApiRequest, NextApiResponse} from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const {category} = req.query

	console.log(category)

	res.status(200).end()
}

export default handler

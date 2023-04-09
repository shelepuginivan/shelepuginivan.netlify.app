import {NextApiRequest, NextApiResponse} from 'next'

import {GalleryService} from '@/utils/GalleryService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const categories = await GalleryService.getCategories()
	res.status(200).json(categories)
}

export default handler

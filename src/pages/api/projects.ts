import {NextApiRequest, NextApiResponse} from 'next'

import {ProjectService} from '@/utils/ProjectsService'
import {ServerException} from '@/utils/ServerException'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const projects = await ProjectService.getAllProjects()
		res.status(200).json(projects)
	} catch (e) {
		if (e instanceof ServerException) {
			res.status(e.status).json({message: e.message})
		} else {
			res.status(500).json({message: 'Внутренняя ошибка сервера'})
		}
	}
}

export default handler

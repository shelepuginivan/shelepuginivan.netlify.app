import {NextApiRequest, NextApiResponse} from 'next'

import {ProjectService} from '@/server/ProjectsService'
import {ServerException} from '@/server/ServerException'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const page = Number(req.query.page) || 1
	const projectsPerPage = Number(req.query.projectsPerPage) || 10

	try {
		const projects = await ProjectService.getAllProjects(page, projectsPerPage)
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

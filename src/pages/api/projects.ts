import {NextApiRequest, NextApiResponse} from 'next'

import {ProjectService} from '@/server/ProjectsService'
import {ServerException} from '@/server/ServerException'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let {page, projectsPerPage} = req.query

	if (typeof page !== 'string' || isNaN(Number(page))) {
		page = '1'
	}

	if (typeof projectsPerPage !== 'string' || isNaN(Number(projectsPerPage))) {
		projectsPerPage = '10'
	}

	try {
		const projects = await ProjectService.getAllProjects(
			Number(page),
			Number(projectsPerPage)
		)
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

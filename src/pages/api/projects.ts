import {NextApiRequest, NextApiResponse} from 'next'

import {ProjectService} from '@/utils/ProjectsService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const projects = await ProjectService.getAllProjects()
	res.status(200).json(projects)
}

export default handler

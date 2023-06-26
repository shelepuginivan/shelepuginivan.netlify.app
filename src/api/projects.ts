import axios from 'axios'

import {Project} from '@/utils/types/Project'

export const fetchProjects = async (page: number, articlesPerPage: number): Promise<Project[]> => {
	const res = await axios.get(`/api/projects?page=${page}&articlesPerPage=${articlesPerPage}`)
	return res.data
}

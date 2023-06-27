import axios from 'axios'

import { getHost } from '@/utils/getHost'
import { Article } from '@/utils/types/Article'

export const fetchRecentArticles = async (): Promise<Article[]> => {
	const res = await axios.get(`${getHost()}/api/blog`)
	return res.data
}

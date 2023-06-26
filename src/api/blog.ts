import axios from 'axios'

import { getHost } from '@/utils/getHost'
import { Article } from '@/utils/types/Article'

export const fetchArticleBySlug = async (slug: string): Promise<Article> => {
	const res = await axios.get(`${getHost()}/api/blog/${slug}`)
	return res.data
}

export const fetchBlogArticles = async (page: number, articlesPerPage: number): Promise<Omit<Article, 'text'>[]> => {
	const res = await axios.get(`/api/blog?page=${page}&articlesPerPage=${articlesPerPage}`)
	return res.data
}


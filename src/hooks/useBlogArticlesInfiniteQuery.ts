import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchBlogArticles } from '@/api/blog'

export const useBlogArticlesInfiniteQuery = (articlesPerPage = 10) => useInfiniteQuery({
	queryFn: ({ pageParam = 1 }) => fetchBlogArticles(pageParam, articlesPerPage),
	queryKey: ['blog-articles'],
	getNextPageParam: (lastPage, allPages) =>
		lastPage.length ? allPages.length + 1 : undefined
})

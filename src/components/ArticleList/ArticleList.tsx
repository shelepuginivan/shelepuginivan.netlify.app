import {FC, useEffect, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import ArticlePreview from '@/components/ArticlePreview/ArticlePreview'
import Center from '@/ui/Center/Center'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'
import {Article} from '@/utils/types/Article'

import styles from './articleList.module.sass'

const ArticleList: FC = () => {
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [articles, setArticles] = useState<Omit<Article, 'text'>[]>([])
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [hasMore, setHasMore] = useState<boolean>(true)

	useEffect(() => {
		const initialFetch = async () => {
			const res = await fetch(`/api/blog?page=${currentPage}`)

			const json = await res.json()

			if (res.status !== 200) {
				setErrorMessage((json as Record<'message', string>).message)
				return
			}

			setArticles(json)
			setCurrentPage(prev => prev + 1)
		}

		initialFetch()
	}, [])

	const fetchArticlesOnCurrentPage = async () => {
		const res = await fetch(`/api/blog?page=${currentPage}`)

		const json = await res.json()


		if (res.status !== 200) {
			setErrorMessage((json as Record<'message', string>).message)
			return
		}

		if (Array.isArray(json) && json.length === 0) {
			setHasMore(false)
			return
		}

		setArticles(prev => [...prev, ...json as Omit<Article, 'text'>[]])
		setCurrentPage(prev => prev + 1)
	}

	if (errorMessage)
		return <ErrorMessage message={errorMessage}/>

	return (
		<InfiniteScroll
			className={styles.list}
			next={fetchArticlesOnCurrentPage}
			hasMore={hasMore}
			loader={<Center>
				<Loader/>
			</Center>}
			dataLength={articles.length}
		>
			{
				articles?.map(
					(article, index) =>
						<ArticlePreview
							key={index}
							{...article}
						/>
				)
			}
		</InfiniteScroll>
	)
}

export default ArticleList

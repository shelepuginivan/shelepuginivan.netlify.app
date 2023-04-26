import {FC, useCallback, useEffect, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import ArticlePreview from '@/components/ArticlePreview/ArticlePreview'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'
import {Article} from '@/utils/types/Article'

import styles from './articleList.module.sass'

const ArticleList: FC = () => {
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [articles, setArticles] = useState<Omit<Article, 'text'>[]>([])
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [hasMore, setHasMore] = useState<boolean>(true)

	const fetchArticles = useCallback(async () => {
		const res = await fetch(`/api/blog?page=${currentPage}`)

		const json = await res.json()

		if (res.status >= 400) {
			return setErrorMessage((json as Record<'message', string>).message)
		}

		if (json.length === 0) {
			return setHasMore(false)
		}

		setArticles(prev => prev ? [...prev, ...json as Omit<Article, 'text'>[]] : json)
		setCurrentPage(prev => prev + 1)
	}, [currentPage])

	useEffect(() => {
		fetchArticles()
	}, [fetchArticles])

	if (errorMessage)
		return <ErrorMessage message={errorMessage}/>

	return (
		<InfiniteScroll
			className={styles.list}
			next={fetchArticles}
			hasMore={hasMore}
			loader={<div className={styles.loaderWrapper}>
				<Loader/>
			</div>}
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

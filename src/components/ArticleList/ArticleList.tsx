import {FC, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import ArticlePreview from '@/components/ArticlePreview/ArticlePreview'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'
import {Article} from '@/utils/types/Article'

import styles from './articleList.module.sass'

type PropsType = {
	initialArticles: Omit<Article, 'text'>[] | []
	errorMessage?: string
}

const ArticleList: FC<PropsType> = (props) => {
	const [currentPage, setCurrentPage] = useState<number>(2)
	const [articles, setArticles] = useState<Omit<Article, 'text'>[]>(props.initialArticles)
	const [errorMessage, setErrorMessage] = useState<string | undefined>(props.errorMessage)
	const [hasMore, setHasMore] = useState<boolean>(true)

	const fetchArticlesOnCurrentPage = async () => {
		const res = await fetch(`/api/blog?page=${currentPage}`)

		const json = await res.json()

		if (res.status >= 400) {
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

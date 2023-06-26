import {FC} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import ArticlePreview from '@/components/ArticlePreview/ArticlePreview'
import {useBlogArticlesInfiniteQuery} from '@/hooks/useBlogArticlesInfiniteQuery'
import Center from '@/ui/Center/Center'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'
import {errorMessage} from '@/utils/errorMessage'

import styles from './articleList.module.sass'

const ArticleList: FC = () => {
	const {data, error, fetchNextPage, hasNextPage, isLoading} = useBlogArticlesInfiniteQuery()

	if (error)
		return <ErrorMessage message={errorMessage(error)}/>

	if (isLoading) {
		return <Center>
			<Loader/>
		</Center>
	}

	return (
		<InfiniteScroll
			className={styles.list}
			next={fetchNextPage}
			hasMore={Boolean(hasNextPage)}
			loader={<div className={styles.loaderWrapper}>
				<Loader/>
			</div>}
			dataLength={data?.pages.length ?? 0}
		>
			{data?.pages.map(articles =>
				articles.map(article =>
					<ArticlePreview
						key={article.title}
						{...article}
					/>
				)
			)}
		</InfiniteScroll>
	)
}

export default ArticleList

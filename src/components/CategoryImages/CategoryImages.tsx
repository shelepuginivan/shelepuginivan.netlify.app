import { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useGalleryImagesInfiniteQuery } from '@/hooks/useGalleryImagesInfiniteQuery'
import Center from '@/ui/Center/Center'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'
import { errorMessage } from '@/utils/errorMessage'

import styles from './categoryImages.module.sass'

const CategoryImages: FC<{category: string}> = ({ category }) => {
	const { data, error, fetchNextPage, hasNextPage, isLoading } = useGalleryImagesInfiniteQuery(category)

	if (error) {
		return <ErrorMessage message={errorMessage(error)}/>
	}

	if (isLoading) {
		return <Center>
			<Loader/>
		</Center>
	}

	return (
		<InfiniteScroll
			className={styles.wrapper}
			next={fetchNextPage}
			hasMore={Boolean(hasNextPage)}
			loader={<div className={styles.loaderWrapper}>
				<Loader/>
			</div>}
			dataLength={data?.pages.length ?? 0}
		>
			{data?.pages.map(images =>
				images.map(image =>
					<img src={image} alt='' key={image}/>
				)
			)}
		</InfiniteScroll>
	)
}

export default CategoryImages

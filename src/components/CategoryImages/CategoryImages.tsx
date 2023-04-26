import {FC, useCallback, useEffect, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'

import styles from './categoryImages.module.sass'

const CategoryImages: FC<{category?: string | string[]}> = ({category}) => {
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [hasMore, setHasMore] = useState<boolean>(true)
	const [images, setImages] = useState<string[]>([])
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const fetchImages = useCallback(async () => {
		if (!category) return

		const res = await fetch(`/api/gallery/${category}?page=${currentPage}`)
		const json = await res.json()

		if (res.status >= 400) {
			return setErrorMessage(json.message)
		}

		if (images.length === 0 && json.length === 0) {
			return setErrorMessage(`Категория ${category} не найдена`)
		}

		if (json.length === 0) {
			return setHasMore(false)
		}

		setImages(prev => [...prev, ...(json as Record<'url', string>[]).map(item => item.url) as string[]])
		setCurrentPage(prev => prev + 1)
	}, [category, currentPage])

	useEffect(() => {
		fetchImages()
	}, [fetchImages])

	if (errorMessage) {
		return <ErrorMessage message={errorMessage}/>
	}

	return (
		<InfiniteScroll
			className={styles.wrapper}
			next={fetchImages}
			hasMore={hasMore}
			loader={<div className={styles.loaderWrapper}>
				<Loader/>
			</div>}
			dataLength={images.length}
		>
			{
				images.map(
					(image, index) => <img src={image} alt="" key={index}/>
				)
			}
		</InfiniteScroll>
	)
}

export default CategoryImages

import {FC, useEffect, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import Center from '@/ui/Center/Center'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'

import styles from './categoryImages.module.sass'

const CategoryImages: FC<{category?: string | string[]}> = ({category}) => {
	const [currentPage, setCurrentPage] = useState<number>(2)
	const [hasMore, setHasMore] = useState<boolean>(true)
	const [images, setImages] = useState<string[] | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const fetchImages = async () => {
		const res = await fetch(`/api/gallery/${category}?page=${currentPage}`)
		const json = await res.json()

		if (res.status >= 400) {
			return setErrorMessage(json.message)
		}

		if (Array.isArray(json) && json.length === 0) {
			return setHasMore(false)
		}

		setImages(prev => [...prev, ...json.map(item => item.url) as string[]])
		setCurrentPage(prev => prev + 1)
	}

	useEffect(() => {
		const fetchGalleryItems = async () => {
			if (!category) return

			const res = await fetch(`/api/gallery/${category}`)
			const json: Record<'url', string>[] & Record<'message', string> = await res.json()

			if (res.status >= 400) {
				return setErrorMessage(json.message)
			}

			if (Array.isArray(json) && json.length === 0) {
				return setHasMore(false)
			}

			setImages(json.map(item => item.url))
		}

		fetchGalleryItems()
	}, [category])

	if (!images)
		return <Center>
			<Loader/>
		</Center>

	if (errorMessage) {
		return <ErrorMessage message={errorMessage}/>
	}

	if ((typeof category !== 'string') || images && images.length === 0) {
		return <ErrorMessage message={`Категория "${category}" не найдена`}/>
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

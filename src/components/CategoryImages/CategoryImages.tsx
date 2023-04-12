import {FC, useEffect, useState} from 'react'

import Center from '@/ui/Center/Center'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'

import styles from './categoryImages.module.sass'

const CategoryImages: FC<{category?: string | string[]}> = ({category}) => {
	const [images, setImages] = useState<string[] | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	useEffect(() => {
		const fetchGalleryItems = async () => {
			if (!category) return

			const res = await fetch(`/api/gallery/${category}`)
			const json: Record<'url', string>[] & Record<'message', string> = await res.json()

			if (res.status >= 400) {
				setErrorMessage(json.message)
			}

			setImages(json.map(item => item.url))
		}

		fetchGalleryItems()
	}, [category])

	if (!images)
		return <Center>
			<Loader/>
		</Center>

	if (errorMessage)
		return <ErrorMessage message={errorMessage}/>

	if ((typeof category !== 'string') || images && images.length === 0)
		return <ErrorMessage message={`Категория "${category}" не найдена`}/>

	return (
		<div className={styles.wrapper}>
			{
				images.map(
					(image, index) => <img src={image} alt="" key={index}/>
				)
			}
		</div>
	)
}

export default CategoryImages

import {FC, useEffect, useState} from 'react'

import Center from '@/ui/Center/Center'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'

import styles from './categoryImages.module.sass'

const CategoryImages: FC<{category?: string | string[]}> = ({category}) => {
	const [images, setImages] = useState<string[] | null>(null)

	useEffect(() => {
		const fetchGalleryItems = async () => {
			const res = await fetch(`/api/gallery/${category}`)
			const json: Record<'url', string>[] = await res.json()

			setImages(json.map(item => item.url))
		}

		fetchGalleryItems()
	}, [])

	if (typeof category !== 'string')
		return <ErrorMessage message={`Категория "${category}" не найдена`}/>

	if (images && images.length === 0)
		return <ErrorMessage message={`В категории "${category}" картинок нет`}/>

	if (!images) return <Center>
		<Loader/>
	</Center>

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

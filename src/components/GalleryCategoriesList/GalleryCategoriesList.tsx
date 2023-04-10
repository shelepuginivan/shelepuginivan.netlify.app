import {FC, useEffect, useRef, useState} from 'react'

import ContentCard from '@/components/ContentCard/ContentCard'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import {GalleryCategory} from '@/utils/types/GalleryCategory'

import styles from './galleryCategoriesList.module.sass'

type PropsType = {
	errorMessage?: string
	galleryCategories?: GalleryCategory[]
}

const GalleryCategoriesList: FC<PropsType> = (
	{galleryCategories, errorMessage}) => {
	const [showSecret, setShowSecret] = useState<boolean>(false)

	const secretCode = useRef<string>('')

	const secretCodeEnter = (e: KeyboardEvent) => {
		switch (e.key) {
		case 'Enter':
			return setShowSecret(secretCode.current === process.env.NEXT_PUBLIC_UNLOCK_SECRET_PASSWORD)
		case 'Backspace':
			secretCode.current = secretCode.current.slice(0, -1)
			break
		case 'Alt':
		case 'Control':
		case 'OS':
		case 'Shift':
			break
		default:
			secretCode.current += e.key
		}
	}

	useEffect(() => {
		document.body.addEventListener('keydown', secretCodeEnter)

		return () => document.body.removeEventListener('keydown', secretCodeEnter)
	}, [])

	if (errorMessage || !galleryCategories) {
		return <ErrorMessage message={errorMessage ?? 'Не удалось загрузить категории'}/>
	}

	return (
		<div className={styles.wrapper}>
			{
				galleryCategories.map(
					(category, index) => {
						if (showSecret || category.name !== process.env.NEXT_PUBLIC_SECRET_CATEGORY)
							return <ContentCard
								key={index}
								title={category.name}
								backgroundImage={category.previewUrl}
								href={`/gallery/${category.name}`}
							/>

						return null
					}
				)
			}
		</div>
	)
}

export default GalleryCategoriesList

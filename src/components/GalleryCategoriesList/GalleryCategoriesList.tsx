import {FC, useEffect, useRef, useState} from 'react'

import ContentCard from '@/components/ContentCard/ContentCard'
import Center from '@/ui/Center/Center'
import Loader from '@/ui/Loader/Loader'
import {GalleryCategory} from '@/utils/types/GalleryCategory'

import styles from './galleryCategoriesList.module.sass'

const GalleryCategoriesList: FC = () => {
	const [galleryCategories, setGalleryCategories] = useState<GalleryCategory[] | null>(null)
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
		const fetchCategories = async () => {
			const res = await fetch('/api/gallery')
			const categories: GalleryCategory[] = await res.json()

			setGalleryCategories(categories)
		}
		
		fetchCategories()
	}, [])

	useEffect(() => {
		document.body.addEventListener('keydown', secretCodeEnter)

		return () => document.body.removeEventListener('keydown', secretCodeEnter)
	}, [])

	if (!galleryCategories) {
		return <Center>
			<Loader/>
		</Center>
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

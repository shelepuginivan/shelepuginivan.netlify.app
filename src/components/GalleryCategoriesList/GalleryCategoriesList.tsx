import {FC, useEffect, useRef, useState} from 'react'

import ContentCard from '@/components/ContentCard/ContentCard'
import Center from '@/ui/Center/Center'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'
import {getHost} from '@/utils/getHost'
import {GalleryCategory} from '@/utils/types/GalleryCategory'

import styles from './galleryCategoriesList.module.sass'

const GalleryCategoriesList: FC = () => {
	const [categories, setCategories] = useState<GalleryCategory[] | null>(null)
	const [showSecret, setShowSecret] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const secretCode = useRef<string>('')

	useEffect(() => {
		const fetchCategories = async () => {
			const res = await fetch(`${getHost()}/api/gallery`)
			const json = await res.json()

			if (res.status >= 400) {
				return setErrorMessage(json.message)
			}

			return setCategories(json)
		}
		
		fetchCategories()
	}, [])
	
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
	
	if (!categories) {
		return <Center><Loader/></Center>
	}

	if (errorMessage) {
		return <ErrorMessage message={errorMessage}/>
	}

	return (
		<div className={styles.wrapper}>
			{
				categories.map(
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

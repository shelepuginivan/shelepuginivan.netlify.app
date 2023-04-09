import {FC, useEffect, useState} from 'react'

import ContentCard from '@/components/ContentCard/ContentCard'
import Center from '@/ui/Center/Center'
import Loader from '@/ui/Loader/Loader'
import {GalleryCategory} from '@/utils/types/GalleryCategory'

import {wrapper} from './galleryCategoriesList.module.sass'

const GalleryCategoriesList: FC = () => {
	const [galleryCategories, setGalleryCategories] = useState<GalleryCategory[]>(null)
	
	useEffect(() => {
		const fetchCategories = async () => {
			const res = await fetch('/api/gallery')
			const categories: GalleryCategory[] = await res.json()

			setGalleryCategories(categories)
		}
		
		fetchCategories()
	}, [])
	
	if (!galleryCategories) {
		return <Center>
			<Loader/>
		</Center>
	}

	return (
		<div className={wrapper}>
			{
				galleryCategories.map(
					(category, index) =>
						<ContentCard
							key={index}
							title={category.name}
							backgroundImage={category.previewUrl}
							href={`/gallery/${category.name}`}
						/>
				)
			}
		</div>
	)
}

export default GalleryCategoriesList

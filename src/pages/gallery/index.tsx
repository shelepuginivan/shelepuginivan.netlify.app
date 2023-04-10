import {GetServerSideProps} from 'next'
import {Nunito} from 'next/font/google'
import {FC} from 'react'

import GalleryCategoriesList from '@/components/GalleryCategoriesList/GalleryCategoriesList'
import Container from '@/ui/Container/Container'
import {getHost} from '@/utils/getHost'
import {GalleryCategory} from '@/utils/types/GalleryCategory'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

type PropsType = {
	errorMessage?: string
	galleryCategories?: GalleryCategory[]
}

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
	const res = await fetch(`${getHost()}/api/gallery`)
	const json = await res.json()

	if (res.status >= 400) {
		return {
			props: {
				errorMessage: (json as Record<'message', string>).message
			}
		}
	}

	return {
		props: {
			galleryCategories: json
		}
	}
}

const Gallery: FC<PropsType> = (props) => {
	return (
		<main>
			<Container>
				<h1 className={nunito.className}>Галерея</h1>
				<GalleryCategoriesList {...props}/>
			</Container>
		</main>
	)
}

export default Gallery

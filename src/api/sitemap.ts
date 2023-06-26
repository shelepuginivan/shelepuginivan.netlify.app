import axios from 'axios'

import { getHost } from '@/utils/getHost'
import { GalleryCategory } from '@/utils/types/GalleryCategory'

export const fetchAllGalleryCategories = async (): Promise<GalleryCategory[]> => {
	const res = await axios.get(`${getHost()}/api/gallery`)
	return res.data
}

export const fetchAllSlugs = async (): Promise<string[]> => {
	const res = await axios.get(`${getHost()}/api/blog/slugs`)
	return res.data
}

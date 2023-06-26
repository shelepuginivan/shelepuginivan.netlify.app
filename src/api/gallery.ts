import axios from 'axios'

import { GalleryCategory } from '@/utils/types/GalleryCategory'

export const fetchGalleryCategories = async (): Promise<GalleryCategory[]> => {
	const res = await axios.get('/api/gallery')
	return res.data
}

export const fetchGalleryImages = async (
	category: string,
	page: number,
	imagesPerPage: number
): Promise<string[]> => {
	const res = await axios.get(`/api/gallery/${category}?page=${page}&imagesPerPage=${imagesPerPage}`)
	return res.data
}

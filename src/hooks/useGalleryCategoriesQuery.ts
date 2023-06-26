import {useQuery} from '@tanstack/react-query'

import {fetchGalleryCategories} from '@/api/gallery'

export const useGalleryCategoriesQuery = () => useQuery({
	queryFn: fetchGalleryCategories,
	queryKey: ['gallery-category']
})

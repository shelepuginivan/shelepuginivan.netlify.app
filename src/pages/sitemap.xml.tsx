import { GetServerSideProps } from 'next'

import { fetchAllGalleryCategories, fetchAllSlugs } from '@/api/sitemap'
import { getHost } from '@/utils/getHost'

const sitemapLocation = (url: string) => {
	return `<url>
	<loc>${url}</loc>
</url>
`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	let blogSlugsUrls, galleryCategoriesUrls

	try {
		const blogSlugs = await fetchAllSlugs()
		const galleryCategories = await fetchAllGalleryCategories()

		blogSlugsUrls = blogSlugs.map(slug => sitemapLocation(`${getHost()}/blog/${slug}`)).join('')
		galleryCategoriesUrls = galleryCategories.map(category => sitemapLocation(`${getHost()}/gallery/${category.name}`)).join('')
	} catch (error) {
		blogSlugsUrls = ''
		galleryCategoriesUrls = ''
	}

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${getHost()}/</loc>
	</url>
	<url>
	   <loc>${getHost()}/projects</loc>
	</url>
	<url>
	   <loc>${getHost()}/gallery</loc>
	</url>
	${galleryCategoriesUrls}
	<url>
	   <loc>${getHost()}/blog</loc>
	</url>
	${blogSlugsUrls}
</urlset>`

	res.setHeader('Content-Type', 'text/xml')
	res.write(sitemap)
	res.end()

	return { props: {} }
}

export default () => null

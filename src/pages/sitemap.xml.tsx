import {GetServerSideProps} from 'next'

import {getHost} from '@/utils/getHost'

const sitemapLocation = (url: string) => {
	return `<url>
	<loc>${url}</loc>
</url>
`
}

export const getServerSideProps: GetServerSideProps = async ({res}) => {
	const articlesResponse = await fetch(`${getHost()}/api/blog/slugs`)
	const slugsJson = await articlesResponse.json() as unknown

	const categoriesResponse = await fetch(`${getHost()}/api/gallery/categories`)
	const categoriesJson = await categoriesResponse.json() as unknown

	const articles = (
		Array.isArray(slugsJson) &&
		slugsJson.length > 0 &&
		slugsJson.every(item => typeof item === 'string')
	)
		? slugsJson.map(slug => `${getHost()}/blog/${slug}`)
		: []

	const galleryCategories = (
		Array.isArray(categoriesJson) &&
		categoriesJson.length > 0 &&
		categoriesJson.every(item => typeof item === 'string')
	)
		? categoriesJson.map(category => `${getHost()}/gallery/${category}`)
		: []

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
	${galleryCategories.map(sitemapLocation).join('')}
	<url>
	   <loc>${getHost()}/blog</loc>
	</url>
	${articles.map(sitemapLocation).join('')}
</urlset>`

	res.setHeader('Content-Type', 'text/xml')
	res.write(sitemap)
	res.end()

	return {props: {}}
}

export default () => null

import {GetServerSideProps} from 'next'

import {getHost} from '@/utils/getHost'

const sitemapLocation = (url: string) => {
	return `<url>
	<loc>${url}</loc>
</url>
`
}

export const getServerSideProps: GetServerSideProps = async ({res}) => {
	const articlesResponse = await fetch(`${getHost()}/api/blog`)
	const articlesJson = await articlesResponse.json()

	const categoriesResponse = await fetch(`${getHost()}/api/gallery`)
	const categoriesJson = await categoriesResponse.json()

	const articles = (
		Array.isArray(articlesJson) &&
		articlesJson.length > 0 &&
		Object.hasOwnProperty.call(articlesJson[0], 'slug')
	)
		? articlesJson.map(article => `${getHost()}/blog/${article.slug}`)
		: []

	const galleryCategories = (
		Array.isArray(categoriesJson) &&
		categoriesJson.length > 0 &&
		Object.hasOwnProperty.call(categoriesJson[0], 'name')
	)
		? categoriesJson.map(category => `${getHost()}/gallery/${category.name}`)
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

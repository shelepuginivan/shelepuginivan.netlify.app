import {Nunito} from 'next/font/google'
import Head from 'next/head'
import {FC} from 'react'

import ArticleList from '@/components/ArticleList/ArticleList'
import Container from '@/ui/Container/Container'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const Blog: FC = () => {
	return (
		<>
			<Head>
				<meta name='og:title' content='Блог | Иван Шелепугин'/>
				<title>Блог | Иван Шелепугин</title>
			</Head>
			<main>
				<Container>
					<h1 className={nunito.className}>Статьи</h1>
					<ArticleList/>
				</Container>
			</main>
		</>
	)
}

export default Blog

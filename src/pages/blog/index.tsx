import {GetServerSideProps} from 'next'
import {Nunito} from 'next/font/google'
import {FC} from 'react'

import ArticleList from '@/components/ArticleList/ArticleList'
import Container from '@/ui/Container/Container'
import {getHost} from '@/utils/getHost'
import {Article} from '@/utils/types/Article'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

type PropsType = {
	initialArticles: Omit<Article, 'text'>[] | []
	errorMessage?: string
}

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
	const res = await fetch(`${getHost()}/api/blog?page=1`)

	const json: Omit<Article, 'text'>[] & Record<'message', string> = await res.json()

	if (res.status >= 400) {
		return {
			props: {
				initialArticles: [],
				errorMessage: json.message
			}
		}
	}

	return {
		props: {
			initialArticles: json
		}
	}
}

const Blog: FC<PropsType> = (props) => {
	return (
		<main>
			<Container>
				<h1 className={nunito.className}>Статьи</h1>
				<ArticleList {...props} />
			</Container>
		</main>
	)
}

export default Blog

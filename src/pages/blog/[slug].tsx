import {GetServerSideProps} from 'next'
import Head from 'next/head'
import {FC} from 'react'

import ArticleText from '@/components/ArticleText/ArticleText'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import {getHost} from '@/utils/getHost'
import {Article} from '@/utils/types/Article'

type PropsType = {
	article?: Article
	errorMessage?: string
}

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
	const params = context.params

	if (!params) {
		return {
			props: {
				errorMessage: 'Не удалось получить параметры запроса'
			}
		}
	}

	const {slug} = params

	if (typeof slug !== 'string') {
		return {
			props: {
				errorMessage: 'Недопустимое значение параметра slug'
			}
		}
	}

	const res = await fetch(`${getHost()}/api/blog/${slug}`)
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
			article: json
		}
	}
}

const Article: FC<PropsType> = ({article, errorMessage}) => {
	if (errorMessage || !article)
		return <ErrorMessage message={errorMessage ?? 'Статья не найдена'}/>

	return (
		<>
			<Head>
				<title>{article.title} | Иван Шелепугин</title>
			</Head>
			<main>
				<ArticleText {...article} />
			</main>
		</>
	)
}

export default Article

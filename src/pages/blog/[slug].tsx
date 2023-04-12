import {GetServerSideProps} from 'next'
import Head from 'next/head'
import {FC} from 'react'

import ArticleText from '@/components/ArticleText/ArticleText'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import {descriptionFromText} from '@/utils/descriptionFromText'
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

	const title = `${article.title} | Иван Шелепугин`
	const description = descriptionFromText(article.text)

	return (
		<>
			<Head>
				<meta name='description' content={description}/>
				<meta name='og:title' content={article.title}/>
				<meta name='og:description' content={description}/>
				<meta name='og:type' content='article'/>
				<meta name='og:locale' content='ru_RU'/>
				<meta name='og:image' content={article.previewUrl}/>
				<title>{title}</title>
			</Head>
			<main>
				<ArticleText {...article} />
			</main>
		</>
	)
}

export default Article

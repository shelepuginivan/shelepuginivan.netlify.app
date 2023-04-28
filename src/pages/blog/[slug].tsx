import {GetServerSidePropsContext} from 'next'
import Head from 'next/head'
import {FC} from 'react'

import ArticleHeader from '@/components/ArticleHeader/ArticleHeader'
import ArticleText from '@/components/ArticleText/ArticleText'
import ShareMenu from '@/components/ShareMenu/ShareMenu'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import {descriptionFromText} from '@/utils/descriptionFromText'
import {getHost} from '@/utils/getHost'
import {Article} from '@/utils/types/Article'

type PropsType = {
	article?: Article
	errorMessage?: string
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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
			notFound: true
		}
	}

	const res = await fetch(`${getHost()}/api/blog/${slug}`)
	const json = await res.json()

	if (res.status === 404) {
		return {
			notFound: true
		}
	}

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
				<meta name='og:title' content={title}/>
				<meta name='og:description' content={description}/>
				<meta name='og:type' content='article'/>
				<meta name='og:image' content={article.previewUrl}/>
				<title>{title}</title>
			</Head>
			<main>
				<ArticleHeader {...article}/>
				<ArticleText text={article.text}/>
				<ShareMenu slug={article.slug}/>
			</main>
		</>
	)
}

export default Article

import {AxiosError} from 'axios'
import {GetServerSidePropsContext} from 'next'
import Head from 'next/head'
import {FC} from 'react'

import {fetchArticleBySlug} from '@/api/blog'
import ArticleHeader from '@/components/ArticleHeader/ArticleHeader'
import ArticleText from '@/components/ArticleText/ArticleText'
import ShareMenu from '@/components/ShareMenu/ShareMenu'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import {descriptionFromText} from '@/utils/descriptionFromText'
import {errorMessage} from '@/utils/errorMessage'
import {Article} from '@/utils/types/Article'

type PropsType = {
	article?: Article
	errorMessage?: string
}

export const getServerSideProps = async ({params}: GetServerSidePropsContext) => {
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
	
	try {
		const article = await fetchArticleBySlug(slug)

		return {
			props: {
				article
			}
		}
	} catch (error) {
		if (error instanceof AxiosError && error.status === 404) {
			return {
				notFound: true
			}
		}
		
		return {
			props: {
				errorMessage: errorMessage(error)
			}
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

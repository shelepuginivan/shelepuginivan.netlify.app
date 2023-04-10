import {GetServerSideProps} from 'next'
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
	const {slug} = context.params

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
		<main>
			<ArticleText {...article} />
		</main>
	)
}

export default Article

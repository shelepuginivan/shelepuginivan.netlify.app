import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'

import ArticleText from '@/components/ArticleText/ArticleText'
import Center from '@/ui/Center/Center'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'
import {Article} from '@/utils/types/Article'


const Article = () => {
	const [article, setArticle] = useState<Article | null>(null)
	
	const router = useRouter()
	const {slug} = router.query

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const res = await fetch(`/api/blog/${slug}`)
				const json = await res.json()
				setArticle(json)

			} catch (e) {
				console.log(e)
			}
		}
		
		fetchArticle()
	}, [slug])

	if (typeof slug !== 'string')
		return <ErrorMessage message={`Недопустимое значение параметра ${slug}`}/>
	
	if (!article)
		return <Center>
			<Loader/>
		</Center>

	return (
		<main>
			<ArticleText {...article} />
		</main>
	)
}

export default Article

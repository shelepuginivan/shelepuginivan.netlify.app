import {Nunito} from 'next/font/google'
import Head from 'next/head'
import {useRouter} from 'next/router'

import CategoryImages from '@/components/CategoryImages/CategoryImages'
import Container from '@/ui/Container/Container'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const Category = () => {
	const router = useRouter()
	const {category} = router.query

	return (
		<>
			<Head>
				<title>Галерея - {category} | Иван Шелепугин</title>
			</Head>
			<main>
				<Container>
					<h1 className={nunito.className}>{category}</h1>
					<CategoryImages category={category}/>
				</Container>
			</main>
		</>

	)
}

export default Category

import {Nunito} from 'next/font/google'
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
		<main>
			<Container>
				<h1 className={nunito.className}>{category}</h1>
				<CategoryImages category={category}/>
			</Container>
		</main>
	)
}

export default Category

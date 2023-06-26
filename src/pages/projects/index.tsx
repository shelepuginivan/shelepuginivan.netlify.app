import { Nunito } from 'next/font/google'
import Head from 'next/head'
import { FC } from 'react'

import ProjectsList from '@/components/ProjectsList/ProjectsList'
import Container from '@/ui/Container/Container'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const Projects: FC = () => {
	return (
		<>
			<Head>
				<meta name='og:title' content='Проекты | Иван Шелепугин'/>
				<meta name='og:locale' content='ru_RU'/>
				<title>Проекты | Иван Шелепугин</title>
			</Head>
			<main>
				<Container>
					<h1 className={nunito.className}>Проекты</h1>
				</Container>
				<ProjectsList/>
			</main>
		</>

	)
}

export default Projects

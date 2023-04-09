import {Nunito} from 'next/font/google'

import ProjectsList from '@/components/ProjectsList/ProjectsList'
import Container from '@/ui/Container/Container'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const Projects = () => {
	return (
		<main>
			<Container>
				<h1 className={nunito.className}>Проекты</h1>
			</Container>
			<ProjectsList/>
		</main>
	)
}

export default Projects

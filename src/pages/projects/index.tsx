import {GetStaticProps} from 'next'
import {Nunito} from 'next/font/google'
import {FC} from 'react'

import ProjectsList from '@/components/ProjectsList/ProjectsList'
import Container from '@/ui/Container/Container'
import {getHost} from '@/utils/getHost'
import {Project} from '@/utils/types/Project'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

type PropsType = {
	projects?: Project[]
	errorMessage?: string
}

export const getStaticProps: GetStaticProps<PropsType> = async () => {
	const res = await fetch(`${getHost()}/api/projects`)
	const json: Project[] = await res.json()

	if (res.status >= 400) {
		return {
			props: {
				errorMessage: (json as Record<'message', string>).message
			}
		}
	}

	return {
		props: {
			projects: json
		}
	}
}

const Projects: FC<PropsType> = (props) => {
	return (
		<main>
			<Container>
				<h1 className={nunito.className}>Проекты</h1>
			</Container>
			<ProjectsList {...props}/>
		</main>
	)
}

export default Projects

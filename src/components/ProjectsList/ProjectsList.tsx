import {FC, useEffect, useState} from 'react'

import ProjectCard from '@/components/ProjectCard/ProjectCard'
import Center from '@/ui/Center/Center'
import Container from '@/ui/Container/Container'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'
import {Project} from '@/utils/types/Project'

const ProjectsList: FC = () => {
	const [projects, setProjects] = useState<Project[]>(null)
	const [errorMessage, setErrorMessage] = useState<string>(null)

	useEffect(() => {
		const fetchProjects = async () => {
			const res = await fetch('/api/projects')
			const body: Project[] = await res.json()

			setProjects(body)
		}

		fetchProjects()
			.catch(() => setErrorMessage('Повторите попытку позже'))
	}, [])

	if (errorMessage) {
		return <ErrorMessage message={errorMessage} />
	}
	
	if (!projects) {
		return <Center>
			<Loader/>
		</Center>
	}

	return (
		<Container>
			{
				projects.map((project, index) => (
					<ProjectCard
						key={index}
						title={project.title}
						description={project.description}
						previewImage={project.previewUrl}
						githubLink={project.githubLink}
						demoLink={project.demoLink}
						badges={project.badgesUrls}
					/>
				))
			}
		</Container>
	)
}

export default ProjectsList

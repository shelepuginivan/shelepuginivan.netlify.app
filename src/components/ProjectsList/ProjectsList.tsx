import {FC, useEffect, useState} from 'react'

import ProjectCard from '@/components/ProjectCard/ProjectCard'
import Center from '@/ui/Center/Center'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'
import {Project} from '@/utils/types/Project'

import styles from './projectsList.module.sass'

const ProjectsList: FC = () => {
	const [projects, setProjects] = useState<Project[] | null>()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	useEffect(() => {
		const fetchProjects = async () => {
			const res = await fetch('/api/projects')
			const json: Project[] & Record<'message', string> = await res.json()

			if (res.status >= 400) {
				return setErrorMessage(json.message)
			}

			setProjects(json)
		}

		fetchProjects()
			.catch(e => setErrorMessage(e.message))
	}, [])

	if (!projects) {
		return <Center><Loader/></Center>
	}

	if (errorMessage) {
		return <ErrorMessage message={errorMessage ?? 'Не удалось загрузить проекты'} />
	}

	return (
		<div className={styles.list}>
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
		</div>
	)
}

export default ProjectsList

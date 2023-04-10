import {FC} from 'react'

import ProjectCard from '@/components/ProjectCard/ProjectCard'
import Container from '@/ui/Container/Container'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import {Project} from '@/utils/types/Project'

type PropsType = {
	projects?: Project[]
	errorMessage?: string
}

const ProjectsList: FC<PropsType> = ({projects, errorMessage}) => {
	if (errorMessage || !projects) {
		return <ErrorMessage message={errorMessage ?? 'Не удалось загрузить проекты'} />
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

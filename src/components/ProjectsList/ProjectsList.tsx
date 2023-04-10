import {FC} from 'react'

import ProjectCard from '@/components/ProjectCard/ProjectCard'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import {Project} from '@/utils/types/Project'

import styles from './projectsList.module.sass'

type PropsType = {
	projects?: Project[]
	errorMessage?: string
}

const ProjectsList: FC<PropsType> = ({projects, errorMessage}) => {
	if (errorMessage || !projects) {
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

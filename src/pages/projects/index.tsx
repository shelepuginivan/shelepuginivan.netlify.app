import {useEffect, useState} from 'react'

import ProjectCard from '@/components/ProjectCard/ProjectCard'
import {Project} from '@/utils/types/Project'

const Projects = () => {
	const [projects, setProjects] = useState<Project[]>([])

	useEffect(() => {
		const fetchProjects = async () => {
			const res = await fetch('/api/projects')
			const body: Project[] = await res.json()

			setProjects(body)
		}

		fetchProjects()
	})
	

	return (
		<main>
			{
				projects.map((project, index) => (
					<ProjectCard
						key={index}
						title={project.title}
						description={project.description}
						previewImage={project.previewUrl}
						githubLink={project.githubLink}
						demoLink={project.demoLink}
						stack={project.badgesUrls}
					/>
				))
			}
		</main>
	)
}

export default Projects

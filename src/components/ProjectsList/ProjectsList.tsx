import {FC, useCallback, useEffect, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import ProjectCard from '@/components/ProjectCard/ProjectCard'
import Center from '@/ui/Center/Center'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'
import {Project} from '@/utils/types/Project'

import styles from './projectsList.module.sass'

const ProjectsList: FC = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [hasMore, setHasMore] = useState(false)
	const [projects, setProjects] = useState<Project[] | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const fetchProjects = useCallback(async () => {
		const res = await fetch(`/api/projects?page=${currentPage}`)
		const json = await res.json()

		if (res.status >= 400) {
			return setErrorMessage((json as Record<'message', string>).message)
		}

		if (json.length === 0) {
			return setHasMore(false)
		}

		setProjects(prev => prev ? [...prev, ...json] : json)
		setCurrentPage(prev => prev + 1)
	}, [currentPage])

	useEffect(() => {
		fetchProjects()
	}, [])

	if (!projects) {
		return <Center><Loader/></Center>
	}

	if (errorMessage) {
		return <ErrorMessage message={errorMessage ?? 'Не удалось загрузить проекты'} />
	}

	return (
		<InfiniteScroll
			className={styles.list}
			next={fetchProjects}
			loader={<Loader/>}
			hasMore={hasMore}
			dataLength={projects.length}
		>
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
		</InfiniteScroll>
	)
}

export default ProjectsList

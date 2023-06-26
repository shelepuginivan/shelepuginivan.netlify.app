import { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { useProjectsInfiniteQuery } from '@/hooks/useProjectsInfiniteQuery'
import Center from '@/ui/Center/Center'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Loader from '@/ui/Loader/Loader'
import { errorMessage } from '@/utils/errorMessage'

import styles from './projectsList.module.sass'

const ProjectsList: FC = () => {
	const { data, error, fetchNextPage, hasNextPage, isLoading } = useProjectsInfiniteQuery()
	
	if (error) {
		return <ErrorMessage message={errorMessage(error)} />
	}
	
	if (isLoading) {
		return <Center><Loader/></Center>
	}

	return (
		<InfiniteScroll
			className={styles.list}
			next={fetchNextPage}
			loader={<Loader/>}
			hasMore={Boolean(hasNextPage)}
			dataLength={data?.pages.length ?? 0}
		>
			{data?.pages.map(projects =>
				projects.map(project =>
					<ProjectCard key={project.title} {...project}/>
				)
			)}
		</InfiniteScroll>
	)
}

export default ProjectsList

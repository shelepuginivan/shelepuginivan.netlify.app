import {Roboto_Flex} from 'next/font/google'
import {FC, ReactNode} from 'react'

import {imgToCssUrl} from '@/utils/imgToCssUrl'

import styles from './projectCard.module.sass'

type PropsType = {
	title: string
	description: string
	previewImage: string | Record<'src', string>
	stack?: ReactNode,
	githubLink?: string,
	demoLink?: string
}

const font = Roboto_Flex({
	subsets: ['cyrillic'],
	weight: '400'
})

const ProjectCard: FC<PropsType> = (props) => {
	const preview = imgToCssUrl(props.previewImage)

	return (
		<div className={`${styles.card} ${font.className}`}>
			<div className={styles.img} style={{backgroundImage: preview}} />
			<div className={styles.content}>
				<h2>{props.title}</h2>
				<p>{props.description}</p>
				<div className={styles.badges}>
					{props.stack}
				</div>
				<nav>
					<a href={props.githubLink}><i className='icon-github'></i></a>
					<a href={props.demoLink}><i className='icon-demo'></i></a>
				</nav>
			</div>
		</div>
	)
}

export default ProjectCard

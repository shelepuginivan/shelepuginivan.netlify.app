import {Roboto_Flex} from '@next/font/google'
import {FC, PropsWithChildren, ReactNode} from 'react'

import styles from './projectCard.module.sass'

type PropsType = {
	previewImage: Record<'src', string> | string
	stack?: ReactNode,
	githubLink?: string,
	demoLink?: string
} & PropsWithChildren

const font = Roboto_Flex({
	subsets: ['cyrillic'],
	weight: '400'
})

const ProjectCard: FC<PropsType> = (props) => {
	const preview = `url('${typeof props.previewImage === 'string' ? props.previewImage : props.previewImage.src}')`

	return (
		<div className={`${styles.card} ${font.className}`}>
			<div className={styles.img} style={{backgroundImage: preview}} />
			<div className={styles.content}>
				{props.children}
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

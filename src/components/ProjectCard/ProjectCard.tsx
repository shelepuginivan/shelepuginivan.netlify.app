import { Roboto_Flex } from 'next/font/google'
import { FC } from 'react'

import Badge from '@/ui/Badge/Badge'
import { imgToCssUrl } from '@/utils/imgToCssUrl'

import styles from './projectCard.module.sass'

type PropsType = {
	title: string
	description: string
	previewUrl: string | Record<'src', string>
	badges?: string[],
	githubLink?: string,
	demoLink?: string
}

const font = Roboto_Flex({
	subsets: ['cyrillic'],
	weight: '400'
})

const ProjectCard: FC<PropsType> = (props) => {
	const preview = imgToCssUrl(props.previewUrl)

	const githubLink = props.githubLink
		? <a href={props.githubLink}><i className='icon-github'></i></a>
		: null

	const demoLink = props.demoLink
		? <a href={props.demoLink}><i className='icon-demo'></i></a>
		: null

	return (
		<div className={`${styles.card} ${font.className}`}>
			<div className={styles.img} style={{ backgroundImage: preview }} />
			<div className={styles.content}>
				<h2>{props.title}</h2>
				<p>{props.description}</p>
				<div className={styles.badges}>
					{
						props.badges?.map((badge, index) =>
							<Badge key={index} href={badge}/>
						)
					}
				</div>
				<nav>
					{githubLink}
					{demoLink}
				</nav>
			</div>
		</div>
	)
}

export default ProjectCard

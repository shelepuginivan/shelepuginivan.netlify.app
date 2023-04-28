import {FC} from 'react'

const Badge: FC<{href: string}> = ({href}) =>
	<img src={href} alt='' draggable={false}/>

export default Badge

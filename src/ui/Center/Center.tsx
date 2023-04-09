import {FC, PropsWithChildren} from 'react'

import {center} from './center.module.sass'

const Center: FC<PropsWithChildren> = ({children}) =>
	<div className={center}>{children}</div>

export default Center

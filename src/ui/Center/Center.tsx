import { FC, PropsWithChildren } from 'react'

import styles from './center.module.sass'

const Center: FC<PropsWithChildren> = ({ children }) =>
	<div className={styles.center}>{children}</div>

export default Center

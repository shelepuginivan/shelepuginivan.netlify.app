import { FC, InputHTMLAttributes } from 'react'

import styles from './input.module.sass'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) =>
	<input className={`${styles.input} ${className}`} {...props}/>

export default Input

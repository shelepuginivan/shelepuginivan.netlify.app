import {ButtonHTMLAttributes, FC} from 'react'

import styles from './button.module.sass'

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({className, ...props}) =>
	<button className={`${styles.button} ${className}`} {...props} />

export default Button

import {ButtonHTMLAttributes, FC} from 'react'

import {button} from './button.module.sass'

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({className, ...props}) =>
	<button className={`${button} ${className}`} {...props} />

export default Button

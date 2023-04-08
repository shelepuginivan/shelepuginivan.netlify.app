import {FC, InputHTMLAttributes} from 'react'

import {input} from './input.module.sass'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({className, ...props}) =>
	<input className={`${input} ${className}`} {...props}/>

export default Input

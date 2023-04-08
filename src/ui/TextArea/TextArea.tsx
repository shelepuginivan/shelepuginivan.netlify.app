import {FC, TextareaHTMLAttributes} from 'react'

import {textArea} from './textArea.module.sass'

const TextArea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({className, ...props}) =>
	<textarea className={`${textArea} ${className}`} {...props}/>

export default TextArea

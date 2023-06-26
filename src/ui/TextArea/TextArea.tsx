import { FC, TextareaHTMLAttributes } from 'react'

import styles from './textArea.module.sass'

const TextArea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className, ...props }) =>
	<textarea className={`${styles.textArea} ${className}`} {...props}/>

export default TextArea

export const imgToCssUrl = (img: string | Record<'src', string>) =>
	`url(${typeof img === 'string' ? img : img.src})`

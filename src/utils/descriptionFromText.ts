export const descriptionFromText = (text: string): string => {
	const textWithoutMd = text
		.replace(/#+.*$/gm, '')
		.replace(/\n/gm, ' ')
		.trim()

	const untrimmedDescription = textWithoutMd.slice(0, 300)

	return untrimmedDescription
		.split('.')
		.slice(0, -1)
		.join('.')
}

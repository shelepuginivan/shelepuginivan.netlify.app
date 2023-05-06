export const getHost = (): string =>
	(process.env.NEXT_PUBLIC_NODE_ENV === 'dev'
		? process.env.NEXT_PUBLIC_DEV_HOST
		: process.env.NEXT_PUBLIC_PROD_HOST
	) ?? ''

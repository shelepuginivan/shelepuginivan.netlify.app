import '@/styles/globals.sass'
import '@/styles/reset.sass'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}

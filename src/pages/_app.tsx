import '@/styles/globals.sass'
import '@/styles/reset.sass'
import '@/styles/variables.sass'
import '@/assets/fonts/icomoon/style.css'

import type { AppProps } from 'next/app'

import Footer from '@/components/Footer/Footer'

export default function App({ Component, pageProps }: AppProps) {
	return <>
		<Component {...pageProps} />
		<Footer/>
	</> 
}

import '@/styles/globals.sass'
import '@/styles/reset.sass'
import '@/styles/variables.sass'
import '@/assets/fonts/icomoon/style.css'

import type { AppProps } from 'next/app'

import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

export default function App({ Component, pageProps }: AppProps) {
	return <>
		<Header/>
		<Component {...pageProps} />
		<Footer/>
	</> 
}

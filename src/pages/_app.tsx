import '@/styles/globals.sass'
import '@/styles/reset.sass'
import '@/styles/variables.sass'
import '@/styles/media.sass'
import '@/assets/fonts/icomoon/style.css'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import {useState} from 'react'

import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>
			<Header/>
			<Component {...pageProps} />
			<Footer/>
		</QueryClientProvider>
	)
}

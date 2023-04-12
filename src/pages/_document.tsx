import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='ru'>
			<Head>
				<meta name='charset' content='UTF-8'/>
				<meta name='author' content='Иван Шелепугин'/>
				<meta name='copyright' content='Иван Шелепугин'/>
				<link rel="manifest" href="/manifest.json"/>
				<link rel="icon" href="/favicon.png"/>
				<link rel="shortcut icon" href="/favicon.png"/>
				<link rel="favicon" href="/favicon.png"/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="ru">
			<Head>
				<meta name='author' content='Иван Шелепугин'/>
				<meta name='copyright' content='Иван Шелепугин'/>
				<meta name='charset' content='UTF-8' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

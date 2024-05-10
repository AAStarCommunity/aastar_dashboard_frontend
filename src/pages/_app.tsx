import type { AppProps } from 'next/app'
import Head from 'next/head'
// import '@/styles/globals.scss'
import { Windmill } from '@windmill/react-ui'
import Header from '@/components/Header';
import '@/styles/tailwind.output.css'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>1</title>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
        <meta name="description" content="" />
        {/* <meta name="keywords" content=""/> */}
      </Head>
      <Windmill usePreferences>
        <Header></Header>
        <Component {...pageProps} />
      </Windmill>
    </>
  )
}
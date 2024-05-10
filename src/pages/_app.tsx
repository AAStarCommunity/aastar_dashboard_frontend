import type { AppProps } from 'next/app'
import Head from 'next/head'
import "@/assets/styles/globals.css";
import '@/assets/styles/tailwind.output.css'
import { Windmill } from '@windmill/react-ui'
import UserInfo from '@/components/UserInfo';
import Layout from './layout';




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
        <UserInfo>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserInfo>
      </Windmill>
    </>
  )
}
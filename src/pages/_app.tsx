import type { AppProps } from 'next/app'
import Head from 'next/head'
import "~/public/styles/globals.css";
import '~/public/styles/tailwind.output.css'
import { Windmill } from '@windmill/react-ui'
import UserInfo from '@/components/UserInfo';
import { ThemeProvider } from '@/context/ThemeContext';
import { SidebarProvider } from '@/context/SidebarContext';
import Layout from './layout';
import myTheme from '@/utils/myTheme';




export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>ETHPaymaster</title>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
        <meta name="description" content="" />
        <link rel="icon" type="image/svg+xml" href="/Ed-Park-Favicon.svg" />
        {/* <meta name="keywords" content=""/> */}
      </Head>
      <Windmill usePreferences theme={myTheme}>
        <SidebarProvider>
          <ThemeProvider>
            <UserInfo>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserInfo>
          </ThemeProvider>
        </SidebarProvider>
      </Windmill>
    </>
  )
}
import type { AppProps } from 'next/app'
import Head from 'next/head'
import "~/public/styles/globals.css";
import "~/public/styles/windmills.css";
import '~/public/styles/tailwind.output.css'
import { Windmill } from '@windmill/react-ui'
import UserInfo from '@/components/UserInfo';
import { ThemeProvider } from '@/context/ThemeContext';
import { SidebarProvider } from '@/context/SidebarContext';
import Alert from '@/components/Alert';
import Layout from './layout';
import myTheme from '@/utils/myTheme';


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>AAStar DashBoard</title>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
        <meta name="description" content="a tob platform that interact with our AAStar project(incluing EThPaymaster, Airaccount..) allow  user to apply our project Relay API key,apply gas paid blance ,monitor their data." />
        <link rel="icon" type="image/svg+xml" href="/img/startlogo.svg" />
        {/* <meta name="keywords" content=""/> */}
      </Head>
      <Windmill usePreferences theme={myTheme}>
        <SidebarProvider>
          <ThemeProvider>
            <Alert>
              <UserInfo>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </UserInfo>
            </Alert>
          </ThemeProvider>
        </SidebarProvider>
      </Windmill >
    </>
  )
}

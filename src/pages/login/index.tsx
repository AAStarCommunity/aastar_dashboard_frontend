import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/router';

// import ImageLight from '~/public/img/login-office.jpeg'
// import ImageDark from '~/public/img/login-office-dark.jpeg'
import { GithubIcon, GoogleIcon, LoadingIcon } from '../../../public/icons/index'
import { Label, Button, Input } from '@windmill/react-ui'


import { useUserContext } from '@/context/userContext';
import Message from '@/utils/message';
import ajax, { API } from '@/ajax';
import Spin from '@/components/Spin';
import Form, { IFormItem, IFormRefs } from '@/components/Form';
interface IValue {
  email: string;
  password: string;
}
export default function Login() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { store, setStore } = useUserContext();
  const [butloading, setButLoading] = useState(false)
  const formRefs = useRef<IFormRefs>(null)
  const githubLogin = () => {
    location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&return_to=login/oauth/authorize`
  }



  const formArr: IFormItem[] = ([
    {
      name: 'email',
      label: "Email",
      placeholder: 'email',
      defaultValue: '',
      type: "input",
      inputType: "email",
      required: true
    },
    {
      name: 'password',
      label: "Password",
      placeholder: 'password',
      defaultValue: '',
      type: "input",
      inputType: "possword",
      required: true
    }
  ])

  const getUserInfo = (token: string | undefined) => {
    return new Promise<Record<string, any>>((resolve, reject) => {
      ajax.get(API.GET_USER_INFO).then(({ data }) => {
        if (data.code === 200) {
          setStore({
            token,
            avatar: data.data.github_avatar_url,
            name: data.data.github_login

          })
          resolve(data.data)
        } else {
          reject(data)
        }
      })
    })
  }

  useEffect(() => {
    if (router.isReady) {
      if (router.query.code) {
        setLoading(true)
        ajax.get(API.OAUTH_GITHUB, { code: router.query.code }).then(async ({ data }) => {
          if (data.code === 200) {

            setStore({
              token: data.token
            })
            await getUserInfo(data.token)
            router.replace('/')
          }
        }).finally(() => {
          setLoading(false)
        })
      }

    }

  }, [router.isReady, router])
  const loginHandler = async () => {
    formRefs.current?.getData(({ vailded, values }) => {
      if (vailded) {
        setButLoading(true)
        ajax.post(API.OAUTH_PASSWORD, values).then(async ({ data }) => {
          if (data.code === 200) {
            setStore({
              token: data.token
            })
            await getUserInfo(data.token)
            router.replace('/')
          }
        }).finally(() => {
          setButLoading(false)
        })
      }

    })
  };
  return (
    <>
      {loading && <Spin tip='loading' />}
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 max-w-xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto">
            <main className="flex items-center justify-center p-6 sm:p-12 ">
              <div className="w-full">
                <Image src="/img/startlogo.svg" className="mr-1" width={50} height={50} alt="AAStar"></Image>
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Sign in
                </h1>
                <h2 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200">to continue to AAStar</h2>
                {/* <Form formArr={formArr} ref={formRefs}></Form>

                <Button className="mt-4" iconLeft={butloading ? LoadingIcon : null} disabled={butloading} block onClick={loginHandler}>
                  Sign in
                </Button> */}

                {/* <hr className="my-8" /> */}

                <Button block layout="outline" className='h-12 text-lg font-bold' onClick={githubLogin}>
                  <GithubIcon className="w-6 h-6 mr-2" aria-hidden="true" />
                  Github
                </Button>


              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

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
    location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_GITHUB_CLIENT_ID}&return_to=login/oauth/authorize`
  }



  const [formArr, setFormArr] = useState<IFormItem[]>([
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

  useEffect(() => {
    if (router.isReady) {
      if (router.query.code) {
        setLoading(true)
        ajax.get(API.OAUTH_GITHUB, { code: router.query.code }).then(({ data }) => {
          if (data.code === 200) {

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
        ajax.post(API.OAUTH_PASSWORD, values).then(({ data }) => {
          if (data.code === 200) {
            setStore({
              token: data.token
            })
            router.replace('/')
          }
        }).finally(() => {
          setButLoading(false)
        })
      }

    })

    // if (res.data.login.code === 200) {
    //     store.refetchHandler();

    //     message.success(res.data.login.message);
    //     nav(params.get('orgUrl') || '/');
    //     return;
    // }
    // message.error(res.data.login.message);
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
                <Form formArr={formArr} ref={formRefs}></Form>

                <Button className="mt-4" iconLeft={butloading ? LoadingIcon : null} block onClick={loginHandler}>
                  Sign in
                </Button>

                <hr className="my-8" />

                <Button block layout="outline" onClick={githubLogin}>
                  <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                  Github
                </Button>
                {/* <Button className="mt-4" block layout="outline">
                                <GoogleIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                                google
                            </Button> */}

                {/* <p className="mt-4">
                                <Link
                                    className="text-sm font-medium text-aastar-600 dark:text-aastar-400 hover:underline"
                                    href="/forgot-password"
                                >
                                    Forgot your password?
                                </Link>
                            </p> */}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

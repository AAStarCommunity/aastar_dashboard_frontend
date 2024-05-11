import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/router';

import ImageLight from '~/public/img/login-office.jpeg'
import ImageDark from '~/public/img/login-office-dark.jpeg'
import { GithubIcon, GoogleIcon } from '../../public/icons/index'
import { Label, Button, Input } from '@windmill/react-ui'
// import IInput from '@/components/Input';
import { useUserContext } from '@/hooks/userHook';
interface IValue {
    email: string;
    password: string;
}
export default function Login() {
    const { replace } = useRouter()
    const { store, setStore } = useUserContext();
    const loginHandler = async () => {
        setStore({ id: "1212" })
        replace('/')


        // const res = await login({
        //   variables: values,
        // });
        // if (res.data.login.code === 200) {
        //   store.refetchHandler();

        //   message.success(res.data.login.message);
        //   nav(params.get('orgUrl') || '/');
        //   return;
        // }
        // message.error(res.data.login.message);
    };
    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <Image
                            aria-hidden="true"
                            className="object-cover w-full h-full dark:hidden"
                            src={ImageLight}
                            alt="Office"
                        />
                        <Image
                            aria-hidden="true"
                            className="hidden object-cover w-full h-full dark:block"
                            src={ImageDark}
                            alt="Office"
                        />
                    </div>
                    <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
                            <Label>
                                <span>Email</span>
                                <Input className="mt-1" type="email" placeholder="" />
                            </Label>

                            <Label className="mt-4">
                                <span>Password</span>
                                <Input className="mt-1" type="password" placeholder="" />
                            </Label>

                            <Button className="mt-4" block onClick={loginHandler}>
                                Log in
                            </Button>

                            <hr className="my-8" />

                            <Button block layout="outline">
                                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                                Github
                            </Button>
                            <Button className="mt-4" block layout="outline">
                                <GoogleIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                                google
                            </Button>

                            {/* <p className="mt-4">
                                <Link
                                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                    href="/forgot-password"
                                >
                                    Forgot your password?
                                </Link>
                            </p>
                            <p className="mt-1">
                                <Link
                                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                    href="/create-account"
                                >
                                    Create account
                                </Link>
                            </p> */}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

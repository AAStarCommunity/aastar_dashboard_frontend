import React from 'react'
import routes from '@/utils/sidebar';
import Link from 'next/link';
import Image from 'next/image';
// import { NavLink, Route } from 'react-router-dom'
import * as Icons from '../../../public/icons'
import SidebarSubmenu from './SidebarSubmenu'
import { Button } from '@windmill/react-ui'
import {useRouter} from 'next/router';
// import startlogo from '~/public/img/startlogo.svg'


function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}



function SidebarContent() {
  const router = useRouter()
  function activeRouteClass (href){
    return router.asPath === href ? 'text-gray-800 dark:text-gray-100': ''
  }

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a className="ml-6 flex items-center text-lg font-bold text-gray-800 dark:text-gray-200" href="/">
        <Image src="/img/startlogo.svg" className="mr-1" width={70} height={70}  alt="AAStar"></Image>
        AAStar
      </a>
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <Link
                href={route.path}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${activeRouteClass(route.path)}`}
              >
                {/* <Route path={route.path} exact={route.exact}> */}
                 {activeRouteClass(route.path) && <span
                    className="absolute inset-y-0 left-0 w-1 bg-aastar-600 rounded-tr-lg rounded-br-lg bg-gradient-to-br from-green-400 to-blue-60"
                    aria-hidden="true"
                  ></span>}
                {/* </Route> */}
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                <span className="ml-4">{route.name}</span>
              </Link>
            </li>
          )
        )}
      </ul>
      {/* <div className="px-6 my-6">
        <Button>
          Create account
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div> */}
    </div>
  )
}

export default SidebarContent

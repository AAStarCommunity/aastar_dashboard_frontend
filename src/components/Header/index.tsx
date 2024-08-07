import React, { useContext, useState, useEffect } from 'react'
import { SidebarContext } from '@/context/SidebarContext'
import { ThemeContext } from '@/context/ThemeContext'
import API from "@/ajax/api";
import ajax from "@/ajax"
import { useRouter } from 'next/router';
import { setLocal } from '@/utils/localStorage'


import {
    SearchIcon,
    MoonIcon,
    SunIcon,
    BellIcon,
    MenuIcon,
    OutlineCogIcon,
    OutlineLogoutIcon,
} from '~/public/icons'
import { Avatar, Badge, Dropdown, DropdownItem, Input } from '@windmill/react-ui'
import { KEY, useUserContext } from '@/context/userContext'
import { getLocal } from '@/utils/localStorage';

interface Iprops {
    style: Record<string, string>
}
interface ExternalLinkIconProps {
    width?: number;
    height?: number;
    className?: string;
}
const ExternalLinkIcon: React.FC<ExternalLinkIconProps> = ({ width = 24, height = 24, className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-external-link w-4 h-4 ${className}`}
    >
        <path d="M15 3h6v6"></path>
        <path d="M10 14 21 3"></path>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    </svg>
);
function Header(props: Iprops) {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { toggleSidebar } = useContext(SidebarContext)

    const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

    function handleNotificationsClick() {
        setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
    }

    function handleProfileClick() {
        setIsProfileMenuOpen(!isProfileMenuOpen)
    }

    // default dark theme
    useEffect(() => {
        // setTimeout(() => {
        //     toggleTheme('dark')
        // }, 0)
    }, [])
    const router = useRouter()
    const { store, setStore } = useUserContext();
    const signOut = () => {

        // ajax.post(API.GET_HOUSE_SUMMARYDATA_API).then(() => {
        // setStore(null)

        setLocal(KEY, {});
        router.replace('/login')
        // })
    }



    return (
        <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800" style={props.style}>
            <div className="container flex items-center justify-between h-full px-6 mx-auto text-aastar-600 dark:text-aastar-300">
                {/* <!-- Mobile hamburger --> */}
                <button
                    className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none "
                    onClick={toggleSidebar}
                    aria-label="Menu"
                >
                    <MenuIcon className="w-6 h-6" aria-hidden="true" />
                </button>
                {/* <!-- Search input --> */}
                <div className="flex justify-center flex-1 lg:mr-32 invisible">
                    <div className="relative w-full max-w-xl mr-6 focus-within:text-aastar-500">
                        <div className="absolute inset-y-0 flex items-center pl-2">
                            <SearchIcon className="w-4 h-4" aria-hidden="true" />
                        </div>
                        {/* <Input
                            className="pl-8 text-gray-700"
                            placeholder="Search for projects"
                            aria-label="Search" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} css={undefined} crossOrigin={undefined} /> */}
                    </div>
                </div>
                <ul className="flex items-center flex-shrink-0 space-x-6">
                    {/* <!-- Theme toggler --> */}
                    <li className="flex">
                        <button
                            className="rounded-md focus:outline-none "
                            onClick={toggleTheme}
                            aria-label="Toggle color mode"
                        >
                            {theme === 'dark' ? (
                                <SunIcon className="w-5 h-5" aria-hidden="true" />
                            ) : (
                                <MoonIcon className="w-5 h-5" aria-hidden="true" />
                            )}
                        </button>
                    </li>
                    <li className='flex'>
                        <button onClick= {()=>window.location.href = 'https://docs.aastar.io/'} className='flex  items-center'>
                            <ExternalLinkIcon/>
                            <span>Docs</span>
                        </button>
                    </li>
                    {/* <!-- Notifications menu --> */}
                    <li className="relative hidden">
                        <button
                            className="relative align-middle rounded-md focus:outline-none "
                            onClick={handleNotificationsClick}
                            aria-label="Notifications"
                            aria-haspopup="true"
                        >
                            <BellIcon className="w-5 h-5" aria-hidden="true" />
                            {/* <!-- Notification badge --> */}
                            <span
                                aria-hidden="true"
                                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                            ></span>
                        </button>

                        <Dropdown
                            align="right"
                            isOpen={isNotificationsMenuOpen}
                            onClose={() => setIsNotificationsMenuOpen(false)}
                        >
                            <DropdownItem tag="a" href="#" className="justify-between">
                                <span>Messages</span>
                                <Badge type="danger">13</Badge>
                            </DropdownItem>
                            <DropdownItem tag="a" href="#" className="justify-between">
                                <span>Sales</span>
                                <Badge type="danger">2</Badge>
                            </DropdownItem>
                            <DropdownItem onClick={() => alert('Alerts!')}>
                                <span>Alerts</span>
                            </DropdownItem>
                        </Dropdown>
                    </li>
                    {/* <!-- Profile menu --> */}
                    <li className="relative">
                        <button
                            className="rounded-full  focus:outline-none"
                            onClick={handleProfileClick}
                            aria-label="Account"
                            aria-haspopup="true"
                        >
                            <Avatar
                                className="align-middle"
                                src={store?.avatar || ''}
                                alt={store?.name}
                                aria-hidden="true"
                            />
                        </button>
                        <Dropdown
                            align="right"
                            isOpen={isProfileMenuOpen}
                            onClose={() => setIsProfileMenuOpen(false)}
                        >
                            {/* <DropdownItem tag="a" href="#">
                                <OutlinePersonIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                                <span>Profile</span>
                            </DropdownItem> */}
                            {/* <DropdownItem tag="a" href="https://docs.aastar.io/">
                                <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                                <span>Docs</span>
                            </DropdownItem> */}
                            <DropdownItem onClick={signOut}>
                                <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                                <span>sign out</span>
                            </DropdownItem>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </header >
    )
}

export default Header

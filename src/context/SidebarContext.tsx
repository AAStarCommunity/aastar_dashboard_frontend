import { ObjType } from '@/utils/types';
import React, { useState, useMemo } from 'react'

// create context
export const SidebarContext: React.Context<ObjType> = React.createContext({})

export const SidebarProvider = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    }),
    [isSidebarOpen]
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

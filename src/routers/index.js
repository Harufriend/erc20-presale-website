import { useState, useEffect } from "react"
import { useRoutes } from "react-router-dom"
import { useWindowSize } from "@withvoid/melting-pot"

import Navbar from "components/Navbar"
import Footer from "components/Footer"
import SideBar from "components/SideBar"

import NotFound from "components/NotFound"
import ComingSoon from "components/ComingSoon"

import Dashboard from "./Dashboard"

import UseScrollToTop from "hooks/useScrollToTop"

import { AppRoutes } from "configs/UI"

const AppRouter = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const { width: windowWidth } = useWindowSize()

  let routes = useRoutes([
    { path: AppRoutes.DASHBOARD, element: <Dashboard /> },
    { path: AppRoutes.COMING_SOON, element: <ComingSoon /> },
    { path: AppRoutes.NOT_FOUND, element: <NotFound /> },
  ])

  useEffect(() => {
    if (windowWidth > 1024) {
      setShowSidebar(false)
    }
  }, [windowWidth])

  const onClickSideBar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <>
      <SideBar show={showSidebar} onClickSideBar={onClickSideBar} />
      <Navbar onClickSideBar={onClickSideBar} />
      <UseScrollToTop>{routes}</UseScrollToTop>
      <Footer />
    </>
  )
}

export default AppRouter

import * as React from 'react'
import { useState } from 'react'
import {
  AppBar,
  Container,
  CssBaseline,
  IconButton,
  MenuIcon,
  Toolbar,
  Typography
} from 'components/atoms/'
import SideBar from './SideBar'
import {useGetData} from "components/templates/HomePageTemplate/hooks";
import ChatView from './ChatView'

const drawerWidth = 300

function HomePageTemplate() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  useGetData();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  return (
    <Container sx={{
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` },
      height: 1
    }}>
      <CssBaseline/>
      <SideBar open={mobileOpen} onClose={handleDrawerToggle}/>
      <ChatView onDrawerToggle={handleDrawerToggle} />
    </Container>
  )
}

export default HomePageTemplate

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
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Container>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              My Chat
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <SideBar open={mobileOpen} onClose={handleDrawerToggle}/>
      <ChatView />
    </Container>
  )
}

export default HomePageTemplate

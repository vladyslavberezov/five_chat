import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  CssBaseline,
  MenuIcon
} from '/src/components/atoms/'
import SideBar from './SideBar'

const drawerWidth = 300

function HomePageTemplate() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    // TODO: fetch contacts
    // TODO: fetch chats
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            My Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <SideBar open={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar/>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing.
        </Typography>
      </Box>
    </Box>
  )
}

export default HomePageTemplate

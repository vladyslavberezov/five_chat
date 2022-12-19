import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {  useSetRecoilState } from 'recoil'
import { AppBar, Box, CssBaseline, IconButton, MenuIcon, Toolbar, Typography } from 'components/atoms/'
import { UsersDAO } from 'src/api/DAO'
import { chatStore, contactStore, userStore } from 'src/store'
import apiService from 'src/api/APIService'
import SideBar from './SideBar'

const drawerWidth = 300

function HomePageTemplate() {
  const router = useRouter()
  const setUser = useSetRecoilState(userStore)
  const setContacts = useSetRecoilState(contactStore)
  const setChats = useSetRecoilState(chatStore)
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData() {
      const usersRes = await UsersDAO.getMe()
      const userData = usersRes?.data?.data;
      if (!userData) {
        // TODO: show toast with error
        return;
      }
      setUser(userData)

      const [contactsRes, chatsRes] = await Promise.all([
        UsersDAO.getUserContacts(userData.id),
        UsersDAO.getUserChats(userData.id)
      ]);
      setContacts(contactsRes.data.data)
      setChats(chatsRes.data.data)
    }

    if (apiService.authData.isEmpty()) {
      router.push('/login');
      return;
    }
    fetchData()
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
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            My Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <SideBar open={mobileOpen} onClose={handleDrawerToggle}/>
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

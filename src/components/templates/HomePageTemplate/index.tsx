import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuIcon,
  TextField,
  Toolbar,
  Typography
} from 'components/atoms/'
import { UsersDAO } from 'src/api/DAO'
import { chatStore, contactStore, userStore } from 'src/store'
import apiService from 'src/api/APIService'
import SideBar from './SideBar'
// import { Grid } from '@mui/material'

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
  // const classes = createTheme({
  //     chatSection: {
  //       width: '100%',
  //       height: '80vh'
  //     },
  //     table: {
  //       minWidth: 650,
  {/*    },*/
  }
  //     headBG: {
  //       backgroundColor: '#e0e0e0'
  //     },
  //     borderRight500: {
  //       borderRight: '1px solid #e0e0e0'
  //     },
  //     messageArea: {
  //       height: '70vh',
  //       overflowY: 'auto'
  //     }
  //   })

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

      {/*message history*/}
      <Box>
        {/*messages list*/}
        <List>
          {/*messages list*/}
          <ListItem key="1">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="2">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="left" secondary="09:31"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="3">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="10:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="3">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="10:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="3">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="10:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="3">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="10:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="3">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="10:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="3">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="10:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="3">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="10:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="3">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="10:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="3">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="10:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="3">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="10:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        </List>

        {/*message input*/}
        <Box
          style={{
            padding: '5px 0',
            position: 'fixed',
            bottom: 0,
            width: `calc(100% - ${drawerWidth}px - 40px)`,
            display: 'flex',
            backgroundColor: '#fff',
          }}
        >
          <TextField id="outlined-basic-email" label="Type Something" fullWidth/>
          <Button variant="contained"> Send </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default HomePageTemplate

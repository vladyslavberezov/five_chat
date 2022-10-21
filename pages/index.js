import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '../src/Link'
import CssBaseline from '@mui/material/CssBaseline'
import LogoutIcon from '@mui/icons-material/Logout'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { FormControl, Grid, IconButton } from '@mui/material'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'

export default function Index () {
  return (
    <React.Fragment>
      <CssBaseline/>
      <Link href="/SignIn" color="secondary">
        sign in page
      </Link>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}
        >
          <Paper elevation={5}>
            <Box>
              <Stack
                flexDirection={'row'}
                justifyContent={'flex-end'}
                gap={3}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"
                        sx={{ width: 24, height: 24 }}
                />
                <LogoutIcon/>
              </Stack>
              <Typography variant="h4" gutterBottom>
                My chat!
              </Typography>
              <Divider/>
              <Grid container spacing={12} alignItems="center">
                <Grid id="chat-window" xs={12} item>
                  <List>
                    <text>123</text>
                  </List>
                  <List id="chat-window-messages">
                    {/*{listChatMessages}*/}
                    <ListItem></ListItem>
                  </List>
                </Grid>
                <Grid xs={3} item>
                
                </Grid>
                <Grid xs={9} item>
                
                </Grid>
                <Grid xs={3} item>
                  <FormControl fullWidth>
                    <TextField
                      label="Nickname"
                      variant="outlined"/>
                  </FormControl>
                  <IconButton
                    aria-label="send"
                    color="primary">
                  </IconButton>
                  
                </Grid>
                <Grid xs={8} item>
                  <FormControl fullWidth>
                    <TextField
                      label="Type your message..."
                      variant="outlined"/>
                  </FormControl>
                  <IconButton
                    aria-label="send"
                    color="primary">
                  </IconButton>
  
                </Grid>
                
                
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  )
}







import { useEffect, useRef } from 'react'
import * as React from 'react'
import { activeChatStore, messagesStore, userStore } from 'src/store'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText, MenuIcon,
  TextField,
} from 'components/atoms/'
import { MessagesDAO } from 'src/api/DAO'
import { useSocket, useSocketEvent } from 'src/sockets/socket'
import { AppBar, Container, IconButton, Toolbar, Typography } from 'components/atoms'
import { ChatViewProps } from './types'

function ChatView({ onDrawerToggle }: ChatViewProps) {
  const textField = useRef<HTMLInputElement>()
  const messagesEndRef = useRef<HTMLDivElement>()
  const user = useRecoilValue(userStore)
  const activeChat = useRecoilValue(activeChatStore)
  const [messages, setMessages] = useRecoilState(messagesStore)
  const socket = useSocket('/')
  const drawerWidth = 300 //todo: move out!!!

  const scrollToBottom = (behavior: ScrollBehavior) => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView({ behavior })
    }
  }

  const handleSendMessage = () => {
    if (activeChat && user && textField?.current) {
      const input = textField.current

      const trimmed = input.value.trim()
      if (!trimmed.length) {
        return
      }

      socket.emit('chat_message', {
        chatId: activeChat.id,
        userId: user.id,
        message: input.value,
      })
      input.value = ''
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (activeChat) {
        const res = await MessagesDAO.getMessages(activeChat.id)
        if (!res?.data?.data) {
          return
        }
        setMessages(res.data.data)
      }
    }
    fetchData()
  }, [activeChat])

  useEffect(() => {
    scrollToBottom('auto')
  }, [messages])

  useSocketEvent('/', 'chat_message', ({ data }) => {
    const updatedMessages = [...messages]
    updatedMessages.push(data)
    setMessages(updatedMessages)
  })
  return activeChat && (
    <Box>
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
              onClick={onDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              My Chat
            </Typography>
            {/*<IconButton*/}
            {/*  size="large"*/}
            {/*  aria-label="account of current user"*/}
            {/*  aria-controls="menu-appbar"*/}
            {/*  aria-haspopup="true"*/}
            {/*  onClick={handleMenu}*/}
            {/*  color="inherit"*/}
            {/*>*/}
            {/*  <AccountCircle />*/}
            {/*</IconButton>*/}
            {/*<Menu*/}
            {/*  id="menu-appbar"*/}
            {/*  anchorEl={anchorEl}*/}
            {/*  anchorOrigin={{*/}
            {/*    vertical: 'top',*/}
            {/*    horizontal: 'right',*/}
            {/*  }}*/}
            {/*  keepMounted*/}
            {/*  transformOrigin={{*/}
            {/*    vertical: 'top',*/}
            {/*    horizontal: 'right',*/}
            {/*  }}*/}
            {/*  open={Boolean(anchorEl)}*/}
            {/*  onClose={handleClose}*/}
            {/*>*/}
            {/*  <MenuItem onClick={handleClose}>Profile</MenuItem>*/}
            {/*  <MenuItem onClick={handleClose}>My account</MenuItem>*/}
            {/*</Menu>*/}
          </Toolbar>
        </Container>
      </AppBar>

      {Boolean(messages?.length) && (
        <List sx={{ py: '74px' }}>
          {messages.map((message) => (
            <ListItem key={message.id}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align={user?.id === message.authorId ? 'right' : 'left'}
                    primary={message.text}
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    align={user?.id === message.authorId ? 'right' : 'left'}
                    secondary={message.updatedAt}
                  ></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}

      <div ref={messagesEndRef}/>

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
        <TextField
          id="outlined-basic-email"
          label="Type Something"
          fullWidth
          inputRef={textField}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage()
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>
    </Box>
  )
}

export default ChatView
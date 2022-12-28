import { activeChatStore, messagesStore, userStore } from 'src/store'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from 'components/atoms/'
import { useEffect, useRef } from 'react'
import { MessagesDAO } from 'src/api/DAO'
import { useSocket, useSocketEvent } from 'src/sockets/socket'

function ChatView() {
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
        <TextField id="outlined-basic-email"
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
        > Send </Button>
      </Box>
    </Box>
  )
}

export default ChatView
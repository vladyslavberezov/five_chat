import { activeChatStore, messagesStore, userStore } from "src/store";
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
import { useEffect } from "react";
import { MessagesDAO } from "src/api/DAO";

function ChatView() {
  const user = useRecoilValue(userStore)
  const activeChat = useRecoilValue(activeChatStore)
  const [messages, setMessages] = useRecoilState(messagesStore)
  const drawerWidth = 300
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
  return activeChat && (
    <Box>
      {Boolean(messages?.length) && (
        <List sx={{ pt: '74px' }}>
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
                    secondary="09:30"
                  ></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}

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
  );
}

export default ChatView
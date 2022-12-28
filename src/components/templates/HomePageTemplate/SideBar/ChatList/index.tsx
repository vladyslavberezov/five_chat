import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from 'components/atoms'
import {useRecoilState, useRecoilValue} from 'recoil'
import {activeChatStore, chatStore} from 'src/store'
import {useCallback} from "react";

function ChatList() {
  const chats = useRecoilValue(chatStore)
  const [activeChat, setActiveChat] = useRecoilState(activeChatStore)

  const handleChatSelect = useCallback((chat) => () => {
    setActiveChat(chat);
  }, []);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {chats.map((chat) => (
        <ListItem
          key={chat.id}
          alignItems="flex-start"
          onClick={handleChatSelect(chat)}
          sx={{ bgcolor: chat.id === activeChat?.id ? '#eee' : 'transparent' }}
        >
          <ListItemAvatar>
            <Avatar src=""/>
          </ListItemAvatar>
          <ListItemText
            primary={`${chat.title}`}
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {chat.title}
                </Typography>
                {''}
              </>
            }
          />
          <Divider variant="inset" />
        </ListItem>
      ))}
    </List>
  )
}

export default ChatList
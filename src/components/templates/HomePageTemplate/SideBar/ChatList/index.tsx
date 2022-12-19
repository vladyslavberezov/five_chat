import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from 'components/atoms'
import { useRecoilValue } from 'recoil'
import { chatStore } from 'src/store'

function ChatList() {
  const chats = useRecoilValue(chatStore)

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {chats.map((chat) => (
        <ListItem key={chat.id} alignItems="flex-start">
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
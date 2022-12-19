import { Avatar, List, ListItem, ListItemIcon, ListItemText } from 'components/atoms'
import { useRecoilValue } from 'recoil'
import { contactStore } from 'src/store'

function ContactsList() {
  const contacts = useRecoilValue(contactStore)

  return (
    <List>
      {contacts.map((contact) => (
        <ListItem key={contact.id}>
          <ListItemIcon>
            <Avatar alt={`${contact.User.firstName} ${contact.User.lastName}`} src=""/>
          </ListItemIcon>
          <ListItemText primary={`${contact.User.firstName} ${contact.User.lastName}`}></ListItemText>
          <ListItemText secondary="online"></ListItemText>
        </ListItem>
      ))}
    </List>
  )
}

export default ContactsList

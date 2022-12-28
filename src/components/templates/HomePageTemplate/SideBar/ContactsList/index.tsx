import { Avatar, List, ListItem, ListItemIcon, ListItemText } from 'components/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeContactStore, contactStore } from 'src/store'
import { useCallback } from 'react'
import { ChatDAO } from 'src/api/DAO'

function ContactsList() {
  const contacts = useRecoilValue(contactStore)
  const handleContactClick = useCallback((contact) => async () => {
    console.log('contact', contact)
    await ChatDAO.create({
      title: `${contact.firstName} ${contact.lastName}`,
      users: [contact.id],
    })
  }, [])
  return (
    <List>
      {contacts.map((contact) => (
        <ListItem
          key={contact.id}
          onClick={handleContactClick(contact)}
        >
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

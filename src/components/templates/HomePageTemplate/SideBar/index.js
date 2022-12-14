import * as React from 'react'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Drawer, Tab, TabContext, TabList, TabPanel } from '/src/components/atoms/'
import Menu from './Menu'
import ContactsList from './ContactsList'
import ChatList from './ChatList'

const drawerWidth = 300

function SideBar(props) {
  const { window, onClose, open: mobileOpen } = props
  const [tab, setTab] = useState('1')

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  const drawer = (
    <div>
      <Menu/>

      <Divider/>

      <TabContext value={tab}>
        <TabList variant="fullWidth" onChange={handleTabChange} centered>
          <Tab label="Contacts" value="0"/>
          <Tab label="Chats" value="1"/>
        </TabList>
        <Divider/>
        <TabPanel
          value="0"
          sx={{ padding: 0 }}
        >
          <ContactsList/>
        </TabPanel>

        <TabPanel
          value="1"
          sx={{ padding: 0 }}
        >
          <ChatList/>
        </TabPanel>
      </TabContext>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default SideBar

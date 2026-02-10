'use client'

import React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

type DrawerItem = {
  text: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
}

type DrawerMenuProps = {
  open: boolean
  onClose: () => void
  primaryItems: DrawerItem[]
  secondaryItems: DrawerItem[]
}

export default function DrawerMenu({ open, onClose, primaryItems, secondaryItems }: DrawerMenuProps) {
  const toggleDrawer = (nextOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    if (nextOpen === false) {
      onClose()
    }
  }

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => onClose()}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {primaryItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={item.href ? 'a' : 'button'}
              href={item.href}
              onClick={item.onClick}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {secondaryItems.length > 0 && <Divider />}
      <List>
        {secondaryItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={item.href ? 'a' : 'button'}
              href={item.href}
              onClick={item.onClick}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {list}
    </SwipeableDrawer>
  )
}

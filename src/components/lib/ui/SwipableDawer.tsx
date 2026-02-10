"use client"

import * as React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import type { ButtonProps } from '@mui/material'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

type DrawerItem = {
  text: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
}

type SwipeableDrawerProps = {
  anchor?: Anchor
  buttonLabel?: string
  buttonVariant?: ButtonProps['variant']
  width?: number
  primaryItems?: DrawerItem[]
  secondaryItems?: DrawerItem[]
}

const defaultPrimaryItems: DrawerItem[] = [
  { text: 'Inbox' },
  { text: 'Starred' },
  { text: 'Send email' },
  { text: 'Drafts' },
]

const defaultSecondaryItems: DrawerItem[] = [
  { text: 'All mail' },
  { text: 'Trash' },
  { text: 'Spam' },
]

export default function SwipeableTemporaryDrawer({
  anchor = 'left',
  buttonLabel = 'Open Drawer',
  buttonVariant = 'text',
  width = 250,
  primaryItems = defaultPrimaryItems,
  secondaryItems = defaultSecondaryItems,
}: SwipeableDrawerProps) {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (nextOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setOpen(nextOpen)
  }

  const list = (currentAnchor: Anchor) => (
    <Box
      sx={{ width: currentAnchor === 'top' || currentAnchor === 'bottom' ? 'auto' : width }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {primaryItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={item.href ? 'a' : 'button'}
              href={item.href}
              onClick={() => {
                if (item.onClick) item.onClick()
                setOpen(false)
              }}
            >
              <ListItemIcon>
                {item.icon ? item.icon : index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {secondaryItems.length > 0 ? <Divider /> : null}
      <List>
        {secondaryItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={item.href ? 'a' : 'button'}
              href={item.href}
              onClick={() => {
                if (item.onClick) item.onClick()
                setOpen(false)
              }}
            >
              <ListItemIcon>
                {item.icon ? item.icon : index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <div>
      <Button onClick={toggleDrawer(true)} variant={buttonVariant}>
        {buttonLabel}
      </Button>
      <SwipeableDrawer
        anchor={anchor}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list(anchor)}
      </SwipeableDrawer>
    </div>
  )
}

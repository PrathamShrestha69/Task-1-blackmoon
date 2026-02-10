'use client'

import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import MenuIcon from '@mui/icons-material/Menu'

import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import BuildIcon from '@mui/icons-material/Build'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import SettingsIcon from '@mui/icons-material/Settings'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import React, { useState } from 'react'
import DrawerMenu from '../lib/ui/DrawerMenu'
import SearchBar from '../lib/ui/SearchBar'

type DrawerItem = {
  text: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
}

type NavbarProps = {
  title?: string
  primaryDrawerItems?: DrawerItem[]
  secondaryDrawerItems?: DrawerItem[]
  onSearch?: (query: string) => void
  searchPlaceholder?: string
}



const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const defaultPrimaryItems: DrawerItem[] = [
  { text: 'Home', href: '/', icon: <HomeIcon /> },
  { text: 'About', href: '/#', icon: <InfoIcon /> },
  { text: 'Services', href: '/#', icon: <BuildIcon /> },
  { text: 'Contact', href: '/#', icon: <ContactMailIcon /> },
]

const defaultSecondaryItems: DrawerItem[] = [
  { text: 'Settings', onClick: () => console.log('Settings clicked'), icon: <SettingsIcon /> },
  { text: 'Profile', onClick: () => console.log('Profile clicked'), icon: <PersonIcon /> },
  { text: 'Logout', onClick: () => console.log('Logout clicked'), icon: <LogoutIcon /> },
]

export default function Navbar({
  title = 'Blackmoon',
  primaryDrawerItems = defaultPrimaryItems,
  secondaryDrawerItems = defaultSecondaryItems,
  onSearch,
  searchPlaceholder = 'Search…',
}: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  const wrappedPrimaryItems = primaryDrawerItems.map((item) => ({
    ...item,
    onClick: () => {
      if (item.onClick) item.onClick()
      setDrawerOpen(false)
    },
  }))

  const wrappedSecondaryItems = secondaryDrawerItems.map((item) => ({
    ...item,
    onClick: () => {
      if (item.onClick) item.onClick()
      setDrawerOpen(false)
    },
  }))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ zIndex: 100 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {title}
          </Typography>

          <SearchBar />
        </Toolbar>
      </AppBar>

      {/* drawer menu */}
      <DrawerMenu
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        primaryItems={wrappedPrimaryItems}
        secondaryItems={wrappedSecondaryItems}
      />
    </Box>
  )
}

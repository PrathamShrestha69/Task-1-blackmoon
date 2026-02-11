"use client"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react'

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const ThemeProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  
  return (
    <div>
       <ThemeProvider theme={theme}>
      {children}
      </ThemeProvider>
    </div>
  )
}

export default ThemeProvider
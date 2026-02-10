import { Button } from '@mui/material'
import type { ButtonProps } from '@mui/material'
import React from 'react'

type ButtonIconProps = {
  variant: ButtonProps['variant']
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  text?: React.ReactNode
  color?: ButtonProps['color']
}

const ButtonIcon = ({ variant, startIcon, endIcon, text, color }: ButtonIconProps) => {
  return (
    <Button variant={variant} startIcon={startIcon} endIcon={endIcon} color={color}>
      {text}
    </Button>
  )
}

export default ButtonIcon
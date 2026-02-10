import React from 'react'
import { Skeleton as MuiSkeleton } from '@mui/material'
import type { SkeletonProps } from '@mui/material'

type SkeletonUiProps = Pick<SkeletonProps, 'variant' | 'animation' | 'width' | 'height' | 'sx'>

const SkeletonCustom = ({
  variant = 'circular',
  animation = 'wave',
  width = 40,
  height = 40,
  sx,
}: SkeletonUiProps) => {
  return (
    <MuiSkeleton
      animation={animation}
      variant={variant}
      width={width}
      height={height}
      sx={sx}
    />
  )
}

export default SkeletonCustom
import { ReactNode } from 'react'
import { MotionValue } from 'framer-motion'

export interface DockContextType {
  hovered: boolean
  width: number | undefined
}

export interface DockItemProps {
  key?: string
  id?: string
  children?: ReactNode
}

export interface MouseType {
  position: {
    x: MotionValue<number>
    y: MotionValue<number>
  }
  velocity: {
    x: MotionValue<number>
    y: MotionValue<number>
  }
}

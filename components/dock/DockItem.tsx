import { useEffect, useRef, useState } from 'react'
import { useEvent } from 'react-use'
import { motion, useAnimationControls, useSpring, useTransform } from 'framer-motion'
import { useMouse } from '../context/MouseProvider'
import { useDock } from './Dock'
import { DockContextType, DockItemProps, MouseType } from '../../types'

const DockItem = ({ id, children, ...props }: DockItemProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const mouse = useMouse() as MouseType
  const dock = useDock() as DockContextType

  const [elCenterX, setElCenterX] = useState<number>(0)
  const [opened, setOpened] = useState<boolean>(false)
  const controls = useAnimationControls()

  const dimension = useTransform(mouse.position.x, (mouseX) => {
    return 40 + 38 * Math.cos((((mouseX - elCenterX) / (dock.width ?? 0)) * Math.PI) / 2) ** 58
  })

  const spring = useSpring(40, {
    damping: 10,
    stiffness: 150,
    mass: 0.01,
  })

  useEffect(() => {
    return dimension.onChange((val) => {
      if (dock?.hovered) {
        spring.set(val)
      } else {
        spring.set(40)
      }
    })
  }, [spring, dimension, dock?.hovered])

  useEffect(() => {
    const rect = ref.current ? ref.current.getBoundingClientRect() : null
    if (rect) setElCenterX(rect.x + rect.width / 2)
  }, [])

  useEvent('resize', () => {
    const rect = ref.current ? ref.current.getBoundingClientRect() : null
    if (rect) setElCenterX(rect.x + rect.width / 2)
  })

  return (
    <motion.li
      className="relative"
      {...props}
      onClick={() => {
        if (!opened) {
          setOpened(true)
          controls.start(() => ({ translateY: [0, -20, 0] }))
        }
      }}
    >
      <motion.button
        ref={ref}
        id={id}
        className="ui-box relative h-full w-full"
        aria-describedby={id}
        animate={controls}
        custom={spring}
        transition={{
          default: {
            duration: 0.2,
          },
          translateY: {
            duration: 0.4,
            ease: 'easeInOut',
            times: [0, 0.5, 1],
          },
        }}
        style={{
          height: spring,
          width: spring,
        }}
        whileHover={{
          backgroundColor: 'hsl(209, 81.2%, 84.5%)',
          borderColor: 'hsl(206, 81.9%, 65.3%)',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }}
        whileTap={{ scale: opened ? 1 : 0.85 }}
        whileFocus={{
          backgroundColor: 'hsl(209, 81.2%, 84.5%)',
          borderColor: 'hsl(206, 81.9%, 65.3%)',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }}
      >
        {children}
      </motion.button>
      {opened && (
        <span
          className="absolute -bottom-2.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[hsl(0,0%,63%)]"
          aria-hidden="true"
        />
      )}
    </motion.li>
  )
}

export default DockItem

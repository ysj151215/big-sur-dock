import { useEffect, useRef, useState } from 'react'
import { useEvent } from 'react-use'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useMouse } from '../context/MouseProvider'
import { useDock } from './Dock'

export default function DockItem({ children, id }) {
  const ref = useRef(null)
  const mouse = useMouse()
  const dock = useDock()
  const [elCenterX, setElCenterX] = useState(null)

  const dimension = useTransform(mouse.position.x, (mouseX) => {
    return 48 + 38 * Math.cos((((mouseX - elCenterX) / dock.width) * Math.PI) / 2) ** 58
  })

  const spring = useSpring(48, {
    damping: 10,
    stiffness: 150,
    mass: 0.01,
  })

  useEffect(() => {
    return dimension.onChange((val) => {
      if (dock.hovered) {
        spring.set(val)
      } else {
        spring.set(48)
      }
    })
  }, [spring, dimension, dock.hovered])

  useEffect(() => {
    const rect = ref.current.getBoundingClientRect()
    setElCenterX(rect.x + rect.width / 2)
  }, [])

  useEvent('resize', () => {
    const rect = ref.current.getBoundingClientRect()
    setElCenterX(rect.x + rect.width / 2)
  })

  return (
    <li className="relative">
      <motion.button
        ref={ref}
        id={id}
        className="ui-box"
        aria-describedby={id}
        style={{
          height: spring,
          width: spring,
          transition: 'box-shadow .15s',
        }}
        whileHover={{
          backgroundColor: 'hsl(209, 81.2%, 84.5%)',
          borderColor: 'hsl(206, 81.9%, 65.3%)',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }}
        whileFocus={{
          backgroundColor: 'hsl(209, 81.2%, 84.5%)',
          borderColor: 'hsl(206, 81.9%, 65.3%)',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }}
        whileTap={{ scale: 0.85 }}
      >
        {children}
      </motion.button>
    </li>
  )
}

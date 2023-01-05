import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { MouseProvider } from '../context/MouseProvider'
import DockItem from './DockItem'
import { DockContextType } from '../../types'

/**
 * <DockContext> provider.
 * @param hovered - If is hovering <nav> element.
 * @param width - The width of <nav> element.
 */
const DockContext = createContext<DockContextType | null>(null)

export const useDock = () => {
  return useContext(DockContext)
}

const Dock = () => {
  const ref = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(false)
  const [width, setWidth] = useState<number | undefined>()

  useEffect(() => {
    setWidth(ref?.current?.clientWidth)
  }, [])

  return (
    <MouseProvider>
      <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center">
        <div className="flex w-full justify-center">
          <DockContext.Provider value={{ hovered, width }}>
            <nav
              ref={ref}
              className="bg-grid flex justify-center rounded-md p-4"
              onMouseOver={() => setHovered(true)}
              onMouseOut={() => setHovered(false)}
            >
              <ul className="flex h-10 items-end justify-center space-x-3">
                {Array.from(Array(10)).map((e, idx) => (
                  <DockItem key={`dock-item-${idx}`} />
                ))}
                <li className="self-center" aria-hidden="true">
                  <hr className="!mx-2 block h-12 w-px border-none bg-[hsl(0,0%,78%)]" />
                </li>
                <DockItem />
                <DockItem />
              </ul>
            </nav>
          </DockContext.Provider>
        </div>
      </div>
    </MouseProvider>
  )
}

export default Dock

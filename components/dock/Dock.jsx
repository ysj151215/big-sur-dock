import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { MouseProvider } from '../mouse/MouseProvider'
import DockItem from './DockItem'
import DockIcon from './DockIcon'

const DockContext = createContext(null)

export const useDock = () => {
  return useContext(DockContext)
}

export default function Dock() {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [width, setWidth] = useState()

  const openLink = (e, link) => {
    e.stopPropagation()
    window.open(link)
  }

  useEffect(() => {
    setWidth(ref.current.clientWidth)
  }, [])

  return (
    <MouseProvider>
      <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center">
        <div className="flex w-full justify-center">
          <DockContext.Provider value={{ hovered, width }}>
            <nav
              ref={ref}
              className="flex justify-center rounded-macos bg-zinc-900 py-3 px-4 ring-1 ring-zinc-700/70"
              onMouseOver={() => setHovered(true)}
              onMouseOut={() => setHovered(false)}
            >
              <ul className="flex h-10 items-end justify-center space-x-3">
                <DockItem
                  id="dock-item-home"
                  label="Homepage"
                  onClick={(e) => openLink(e, 'https://www.imjay.dev/')}
                >
                  <DockIcon name="Home" />
                </DockItem>
                <DockItem
                  id="dock-item-project"
                  label="Projects"
                  onClick={(e) => openLink(e, 'https://github.com/ysj151215?tab=repositories')}
                >
                  <DockIcon name="Project" />
                </DockItem>
                <DockItem
                  id="dock-item-github"
                  label="GitHub"
                  onClick={(e) => openLink(e, 'https://github.com/ysj151215')}
                >
                  <DockIcon name="GitHub" />
                </DockItem>
                <DockItem
                  id="dock-item-twitter"
                  label="Twitter"
                  onClick={(e) => openLink(e, 'https://twitter.com/ysj151215')}
                >
                  <DockIcon name="Twitter" />
                </DockItem>
                <li className="self-center" aria-hidden="true">
                  <hr className="!mx-2 block h-8 w-px border-none bg-white/10" />
                </li>
                <DockItem id="dock-item-settings" label="Settings">
                  <DockIcon name="Settings" />
                </DockItem>
                <DockItem id="dock-item-trash" label="Trash">
                  <DockIcon name="Trash" />
                </DockItem>
              </ul>
            </nav>
          </DockContext.Provider>
        </div>
      </div>
    </MouseProvider>
  )
}

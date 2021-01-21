import { useState } from 'react'

export default function useMenu () {
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState(null as Element | null)
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget)
    setOpen(true)
  }
  const closeMenu = () => {
    setOpen(false)
  }
  const menuProps = { open, onClose: closeMenu, anchorEl: anchor }
  return [open, openMenu, closeMenu, menuProps] as const
}
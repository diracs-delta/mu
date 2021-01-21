import { useState } from 'react'

export default function useCollapsible () {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)
  return [open, toggleOpen] as const
}
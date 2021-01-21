import { useState } from 'react'

export default function useDialog () {
  const [open, setOpen] = useState(false)
  const props = { open, onClose: () => setOpen(false) }

  return [props, setOpen] as const
}
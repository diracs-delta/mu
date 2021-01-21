import React from 'react'
import useDialog from 'src/hooks/useDialog'
import NewSongDialog from 'src/components/dialogs/NewSongDialog'

import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

function NewSongButton () {
  const [dialogProps, setDialogOpen] = useDialog()

  return (
    <React.Fragment>
      <Fab
        color='primary'
        style={{position: 'fixed', right: 30, bottom: 30}}
        onClick={() => setDialogOpen(true)}
      >
        <Add />
      </Fab>
      <NewSongDialog {...dialogProps} />
    </React.Fragment>
  )
}

export default NewSongButton
import React from 'react'
import useDialog from 'src/hooks/useDialog'
import NewPlaylistDialog from 'src/components/dialogs/NewPlaylistDialog'

import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

function NewPlaylistButton () {
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
      <NewPlaylistDialog {...dialogProps} />
    </React.Fragment>
  )
}

export default NewPlaylistButton
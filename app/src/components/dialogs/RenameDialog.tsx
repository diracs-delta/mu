import React, { useState } from 'react'
import * as api from 'src/lib/api'

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

interface Props {
  record: TypedRecord
  open: boolean
  onClose: () => void
}

function RenameDialog (props: Props) {
  const [newName, setNewName] = useState('')

  function renameRecord () {
    api.renameRecord(props.record, newName)
    props.onClose()
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>
        Rename {props.record.type}
      </DialogTitle>
      <DialogContent>
        <TextField fullWidth onChange={(e) => setNewName(e.target.value)} label='New name' />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={renameRecord}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RenameDialog
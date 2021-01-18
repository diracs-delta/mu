import React from 'react'
import * as api from 'src/lib/api'

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

interface Props {
  record: TypedRecord
  open: boolean
  closeDialog: () => void
}

interface State {
  newName: string
}

class RenameDialog extends React.Component<Props, State> {
  renameRecord () {
    api.renameRecord(this.props.record, this.state.newName)
    this.props.closeDialog()
  }

  set newName (newName: string) {
    this.setState({ newName })
  }

  render () {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.closeDialog}
      >
        <DialogTitle>
          Rename {this.props.record.type}
        </DialogTitle>
        <DialogContent>
          <TextField fullWidth onChange={(e) => this.newName = e.target.value} label='New name' />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.renameRecord()}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default RenameDialog
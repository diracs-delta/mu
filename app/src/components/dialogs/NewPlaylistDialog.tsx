import React from 'react'
import * as api from 'src/lib/api'

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

interface Props {
  open: boolean
  closeDialog: () => void
}

interface State {
  playlist_name: string
}

class NewPlaylistDialog extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      playlist_name: ''
    }
  }

  uploadPlaylist () {
    api.uploadPlaylist(this.state.playlist_name)
    this.props.closeDialog()
  }

  set playlist_name (playlist_name: string) {
    this.setState({ playlist_name })
  } 

  render () {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.closeDialog}
      >
        <DialogTitle>
          Upload new playlist
        </DialogTitle>
        <DialogContent>
          <TextField fullWidth onChange={(e) => this.playlist_name = e.target.value} label='Playlist name' />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.uploadPlaylist()}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default NewPlaylistDialog
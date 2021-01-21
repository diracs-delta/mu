import { useState } from 'react'
import * as api from 'src/lib/api'

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

interface Props {
  open: boolean
  onClose: () => void
}

function NewPlaylistDialog (props: Props) {
  const [playlistName, setPlaylistName] = useState('')

  function uploadPlaylist () {
    api.uploadPlaylist(playlistName)
    props.onClose()
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>
        Upload new playlist
      </DialogTitle>
      <DialogContent>
        <TextField fullWidth onChange={(e) => setPlaylistName(e.target.value)} label='Playlist name' />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={uploadPlaylist}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewPlaylistDialog
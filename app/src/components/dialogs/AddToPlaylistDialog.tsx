import React from 'react'
import * as api from 'src/lib/api'

import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import PlaylistSearchInput from 'src/components/inputs/PlaylistSearchInput'

interface Props {
  open: boolean
  onClose: () => void
  song: Song
}

function AddToPlaylistDialog (props: Props) {
  function onPlaylistSelect (playlist: Playlist) {
    api.addSongToPlaylist(props.song, playlist)
    props.onClose()
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>Add song to playlist</DialogTitle>
      <DialogContent>
        <PlaylistSearchInput
          onPlaylistSelect={(p) => {
            onPlaylistSelect(p)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AddToPlaylistDialog
import React from 'react'
import * as api from 'src/lib/api'

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import PlaylistSearchInput from 'src/components/inputs/PlaylistSearchInput'

interface Props {
  open: boolean
  onClose: () => void
  song: Song
}

interface State {
  playlistQuery: string
  playlists: Playlist[]
}

class AddToPlaylistDialog extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      playlistQuery: '',
      playlists: []
    }
  }

  componentDidMount () {
    // api.fetchPlaylists()
  }

  onPlaylistSelect (playlist: Playlist) {
    api.addSongToPlaylist(this.props.song, playlist)
    this.props.onClose()
  }

  render () {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <DialogTitle>Add song to playlist</DialogTitle>
        <DialogContent>
          <PlaylistSearchInput
            onPlaylistSelect={(p) => {
              this.onPlaylistSelect(p)
            }}
          />
        </DialogContent>
      </Dialog>
    )
  }
}

export default AddToPlaylistDialog
import React from 'react'
import * as api from 'src/lib/api'

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

interface NewSongDialogProps {
  open: boolean
  closeDialog: () => void
}
interface NewSongDialogState {
  song_title: string
  album_title: string
  album_index: string
  artist_name: string
  file: File | undefined
}

class NewSongDialog extends React.Component<NewSongDialogProps, NewSongDialogState>{
  constructor (props: NewSongDialogProps) {
    super(props)
    this.state = {
      song_title: '',
      album_title: '',
      album_index: '0',
      artist_name: '',
      file: undefined
    }
  }

  uploadSong () {
    if (this.state.file === undefined) {
      alert('You must choose a file to upload!')
      return
    }
    api.uploadSong({ ...this.state })
    this.props.closeDialog()
  }

  set songTitle (songTitle: string) {
    this.setState({ song_title: songTitle })
  }

  set albumTitle (albumTitle: string) {
    this.setState({ album_title: albumTitle })
  }

  set albumIndex (albumIndex: string) {
    this.setState({ album_index: albumIndex })
  }

  set artistName (artistName: string) {
    this.setState({ artist_name: artistName })
  }

  set file (file: File) {
    this.setState({ file })
  }

  render () {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.closeDialog}
      >
        <DialogTitle>
          Upload new Song
        </DialogTitle>
        <DialogContent>
          <TextField fullWidth onChange={(e) => {this.file = (e.target as any).files[0]}} label='Audio file' type='file' />
          <TextField fullWidth onChange={(e) => this.songTitle = e.target.value} label='Song title' />
          <TextField fullWidth onChange={(e) => this.albumTitle = e.target.value} label='Album title' />
          <TextField fullWidth onChange={(e) => this.albumIndex = e.target.value} label='Album index' type='number'/>
          <TextField fullWidth onChange={(e) => this.artistName = e.target.value} label='Artist name' />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.uploadSong()}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default NewSongDialog
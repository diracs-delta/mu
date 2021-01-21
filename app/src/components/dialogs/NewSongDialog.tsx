import React, { useState } from 'react'
import * as api from 'src/lib/api'

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

interface Props {
  open: boolean
  onClose: () => void
}

function NewSongDialog (props: Props) {
  const [songTitle, setSongTitle] = useState('')
  const [albumTitle, setAlbumTitle] = useState('')
  const [albumIndex, setAlbumIndex] = useState('')
  const [artistName, setArtistName] = useState('')
  const [file, setFile] = useState(undefined as File | undefined)

  function uploadSong () {
    if (file === undefined) {
      alert('You must choose a file to upload!')
      return
    }
    api.uploadSong({ songTitle, albumTitle, albumIndex, artistName, file })
    props.onClose()
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>
        Upload new Song
      </DialogTitle>
      <DialogContent>
        <TextField fullWidth onChange={(e) => setFile((e.target as any).files[0])} label='Audio file' type='file' />
        <TextField fullWidth onChange={(e) => setSongTitle(e.target.value)} label='Song title' />
        <TextField fullWidth onChange={(e) => setAlbumTitle(e.target.value)} label='Album title' />
        <TextField fullWidth onChange={(e) => setAlbumIndex(e.target.value)} label='Album index' type='number'/>
        <TextField fullWidth onChange={(e) => setArtistName(e.target.value)} label='Artist name' />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={uploadSong}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewSongDialog
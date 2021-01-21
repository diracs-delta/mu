import React, { useState } from 'react'
import { timeToString } from 'src/lib/time'
import BaseMenu from 'src/components/menus/BaseMenu'
import * as api from 'src/lib/api'
import useDialog from 'src/hooks/useDialog'

import { Grid } from '@material-ui/core'
import AddToPlaylistDialog from '../dialogs/AddToPlaylistDialog'

interface Props {
  song: TypedSong | TypedPlaylistSong
  index?: number
}

export function SongDescText (props: Props) {
  const [dialogProps, setDialogOpen] = useDialog()
  const [visible, setVisible] = useState(true)
  
  let menuActions = [
    {
      label: 'Add to a playlist',
      callback: () => { setDialogOpen(true) }
    },
  ]
  if (props.song.type === 'playlistSong') {
    menuActions = menuActions.concat([
      {
        label: 'Remove from current playlist',
        callback: () => { removeFromCurrentPlaylist() }
      }
    ])
  }

  function removeFromCurrentPlaylist () {
    api.deleteRecord(props.song)
    setVisible(false)
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={1}>
          {props.index}
        </Grid>
        <Grid container item xs={9}>
          <Grid item xs={12}>
            <b>{props.song.title}</b>
          </Grid>
          <Grid item xs={12}>
            {props.song.artist_name} - {props.song.album_title}
          </Grid>
        </Grid>
        <Grid item xs={1}>
          {timeToString(props.song.duration)}
        </Grid>
        <Grid item xs={1}>
          <BaseMenu
            menuActions={menuActions}
          />
        </Grid>
      </Grid>
      <AddToPlaylistDialog {...dialogProps} song={props.song} />
    </React.Fragment>
  )
} 

export default SongDescText
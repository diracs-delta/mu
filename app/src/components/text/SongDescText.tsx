import React from 'react'
import { timeToString } from 'src/lib/time'
import BaseMenu from 'src/components/menus/BaseMenu'
import * as api from 'src/lib/api'

import { Grid } from '@material-ui/core'
import AddToPlaylistDialog from '../dialogs/AddToPlaylistDialog'

interface Props {
  song: TypedSong | TypedPlaylistSong
  index?: number
}
interface State {
  dialogOpen: boolean
  visible: boolean
}

class SongDescText extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      dialogOpen: false,
      visible: true
    }
  }

  openDialog () {
    this.setState({ dialogOpen: true })
  }

  closeDialog () {
    console.log('called')
    this.setState({ dialogOpen: false })
  }

  renderIndex () {
    if (this.props.index === undefined) {
      return (
        null
      )
    } else {
      return (
        <span>{this.props.index}</span>
      )
    }
  }

  removeFromCurrentPlaylist () {
    api.deleteRecord(this.props.song)
    this.setState({ visible: false })
  }

  render () {
    let menuActions = [
      {
        label: 'Add to a playlist',
        callback: () => { this.openDialog() }
      },
    ]
    if (this.props.song.type === 'playlistSong') {
      menuActions = menuActions.concat([
        {
          label: 'Remove from current playlist',
          callback: () => { this.removeFromCurrentPlaylist() }
        }
      ])
    }
    if (!this.state.visible) {
      return null
    }
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={1}>
            {this.props.index}
          </Grid>
          <Grid container item xs={9}>
            <Grid item xs={12}>
              <b>{this.props.song.title}</b>
            </Grid>
            <Grid item xs={12}>
              {this.props.song.artist_name} - {this.props.song.album_title}
            </Grid>
          </Grid>
          <Grid item xs={1}>
            {timeToString(this.props.song.duration)}
          </Grid>
          <Grid item xs={1}>
            <BaseMenu
              menuActions={menuActions}
            />
          </Grid>
        </Grid>
        <AddToPlaylistDialog
          open={this.state.dialogOpen}
          onClose={() => this.closeDialog()}
          song={this.props.song}
        />
      </React.Fragment>
    )
  }
}

export default SongDescText
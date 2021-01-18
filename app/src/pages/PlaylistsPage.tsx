import React from 'react'
import * as api from 'src/lib/api'
import BaseTile from 'src/components/tiles/BaseTile'
import NewPlaylistButton from 'src/components/buttons/NewPlaylistButton'

import { Container } from '@material-ui/core'
import { GridList } from '@material-ui/core'
import { withStyles, WithStyles } from '@material-ui/core'

/* CSS */
const styles = {
  container: {
    height: '100%',
    padding: 30,
  }
}

interface Props extends WithStyles<typeof styles> {
  setQueue: (queue: Array<Song>) => void
}

interface State {
  playlists: Playlist[]
}

class PlaylistsPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      playlists: []
    }
  }

  componentDidMount () {
    api.fetchPlaylists({})
      .then((playlists) => this.setState({ playlists }))
  }

  playPlaylist (playlist: Playlist) {
    api.fetchSongs({ playlist_id: playlist.id })
      .then((queue) => { this.props.setQueue(queue) })
  }

  renderPlaylistTiles () {
    return this.state.playlists.map(playlist => {
      return (
        <GridList>
          <BaseTile
            group={{ ...playlist, type: 'playlist' }}
            playGroup={() => this.playPlaylist(playlist)}
          />
        </GridList>
      )
    })
  }

  render () {
    const { classes } = this.props
    return (
      <Container className={classes.container}>
        <h1>Playlists</h1>
        {this.renderPlaylistTiles()}
        <NewPlaylistButton />
      </Container>
    )
  }
}

export default withStyles(styles)(PlaylistsPage)
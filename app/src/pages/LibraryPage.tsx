import { CircularProgress, Container, GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import React from 'react'

import AlbumTile from 'src/components/tiles/AlbumTile'
import NewSongButton from 'src/components/buttons/NewSongButton'
import * as api from 'src/lib/api'

import { withStyles, WithStyles } from '@material-ui/styles'
import LibrarySearchInput from 'src/components/inputs/LibrarySearchInput'

/* CSS */
const styles = {
  container: {
    height: '100%',
    padding: 30
  }
}

/* JSX */
interface LibraryProps extends WithStyles<typeof styles> {
  setQueue: (queue: Array<Song>) => void
}

export type SearchState = 'none' | 'searching' | 'searched'
interface LibraryState {
  loaded: boolean
  albums: Array<Album>
  albumViews: Array<JSX.Element>
  searchState: SearchState
}

class Library extends React.Component<LibraryProps, LibraryState> {
  constructor (props: LibraryProps) {
    super(props)
    this.state = {
      loaded: false,
      albums: [],
      albumViews: [],
      searchState: 'none'
    }
  }

  componentDidMount () {
    api.fetchAlbums()
      .then((albums: Album[]) => this.setState({ albums }))
      .then(() => this.generateAlbumViews())
      .then(() => this.setState({ loaded: true }))
  }

  generateAlbumViews () {
    return new Promise<void>((resolve, reject) => {
      const albumViews: Array<JSX.Element> = Array.from(this.state.albums, (album) => {
        return (
          <AlbumTile
            album={album}
            playAlbum={() => this.playAlbum(album)}
            key={album.id}
          />
        )
      })
      this.setState({ albumViews }, resolve)
    })
  }

  playAlbum (album: Album) {
    api.fetchSongs({ album_id: album.id })
      .then((queue) => {
        this.props.setQueue(queue)
      })
  }

  renderContent () {
    return (
      <GridList>
        {this.state.albumViews}
      </GridList>
    )
  }
 
  render () {
    const { classes } = this.props
    if (this.state.loaded === false) {
      return (
        <CircularProgress />
      )
    } else {
      return (
        <Container className={classes.container}>
          <h1>Library</h1>
          <LibrarySearchInput />
          {this.renderContent()}
          <NewSongButton />
        </Container>
      )
    }
  }
}

export default withStyles(styles)(Library)
import React from 'react'
import * as api from 'src/lib/api'
import { CircularProgress, Dialog, DialogContent } from '@material-ui/core'
import SongList from 'src/components/lists/SongList'
import PlaylistSongList from 'src/components/lists/PlaylistSongList'

interface Props {
  open: boolean
  onClose: () => void
  group: TypedAlbum | TypedPlaylist
}

interface StateWithSongs {
  songs: Song[]
  songsType: 'songs'
  loaded: boolean
}

interface StateWithPlaylistSongs {
  songs: PlaylistSong[]
  songsType: 'playlistSongs'
  loaded: boolean
}

type State = StateWithSongs | StateWithPlaylistSongs

class GroupDialog extends React.Component<Props, State>{
  constructor (props: Props) {
    super(props)
    this.state = {
      songs: [],
      songsType: 'songs',
      loaded: false
    }
  }

  componentDidMount () {
    if (this.props.group.type === 'album') {
      api.fetchSongs({ album_id: this.props.group.id })
        .then(songs => this.setState({
          songs,
          songsType: 'songs',
          loaded: true
        }))
    } else if (this.props.group.type === 'playlist') {
      api.fetchPlaylistSongs(this.props.group)
        .then(songs => this.setState({
          songs,
          songsType: 'playlistSongs',
          loaded: true
        }))
    }
  }

  renderDialogContent () {
    const list = (this.state.songsType === 'songs')
      ? <SongList songs={this.state.songs} />
      : <PlaylistSongList songs={this.state.songs} />

    if (this.state.loaded) {
      return (
        <DialogContent>
          {list}
        </DialogContent>
      )
    } else {
      return (
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      )
    }
  }

  render () {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
      >
        {this.renderDialogContent()}
      </Dialog>
    )
  }
}

// interface TypedAlbumSongs {
//   list: Song[]
//   type: 'albumSongs'
// }

// interface TypedPlaylistSongs {
//   list: PlaylistSong[]
//   type: 'playlistSongs'
// }

// interface LoadingSongs {
//   type: 'loading'
// }

// type TypedGroupSongs = TypedAlbumSongs | TypedPlaylistSongs | LoadingSongs

// const [songs, setSongs]

// function GroupDialog (props: Props) {
//   const [songs, setSongs] = useState({
//     type: 'loading'
//   } as TypedGroupSongs)

//   useEffect(() => {
//     switch (props.group.type) {
//       case 'album': {
//         api.fetchSongs({ album_id: props.group.id })
//           .then(songs => setSongs({ list: songs, type: 'albumSongs' }))
//         break
//       }
//       case 'playlist': {
//         api.fetchPlaylistSongs(props.group)
//           .then(songs => setSongs({ list: songs, type: 'playlistSongs' } as TypedPlaylistSongs))
//         break
//       }
//     }
//   })

//   function renderDialogContent () {

//   }
// }

export default GroupDialog
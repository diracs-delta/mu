import SongDescText from 'src/components/text/SongDescText'

import { MenuItem } from '@material-ui/core'

interface Props {
  songs: PlaylistSong[]
  indexBy?: 'position' | 'album_index' | 'playlist_index'
}

interface State {
  songs: PlaylistSong[]
}

function SongList (props: Props) {
  function renderSongs () {
    return props.songs.map((song, position) => {
      let index = song.playlist_index
      if (props.indexBy === 'position') {
        index = position
      } else if (props.indexBy === 'album_index') {
        index = song.album_index
      } else if (props.indexBy === 'playlist_index') {
        index = song.playlist_index
      }
      return (
        <MenuItem button={false} key={song.playlist_entry_id}>
          <SongDescText
            song={{ ...song, type: 'playlistSong' }}
            index={index}
          />
        </MenuItem>
      )
    })
  }

  return (
    <div>
      { renderSongs() }
    </div>
  )
}

export default SongList
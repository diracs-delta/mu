import SongDescText from 'src/components/text/SongDescText'

import { MenuItem } from '@material-ui/core'

interface Props {
  songs: Song[]
  indexByPosition?: boolean
  indexBy?: 'position' | 'album_index'
}

export default function SongList (props: Props) {
  function renderSongs () {
    return props.songs.map((song, position) => {
      let index = song.album_index
      if (props.indexBy === 'position') {
        index = position + 1
      } else if (props.indexBy === 'album_index') {
        index = song.album_index
      }
      return (
        <MenuItem button={false} key={index}>
          <SongDescText
            song={{ ...song, type: 'song' }}
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
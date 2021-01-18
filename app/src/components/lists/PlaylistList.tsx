import { MenuItem } from '@material-ui/core'

interface Props {
  playlists: Playlist[]
  onSelect?: (playlist: Playlist) => void
}

function PlaylistList (props: Props) {
  const onSelect = props.onSelect

  function renderPlaylistList () {
    return props.playlists.map(playlist => {
      if (onSelect) {
        return (
          <MenuItem onClick={() => onSelect(playlist)} key={playlist.id}>
            <b>{playlist.name}</b>
          </MenuItem>
        )
      } else {
        return (
          <MenuItem button={false} key={playlist.id}>
            <b>{playlist.name}</b>
          </MenuItem>
        )
      }
    })
  }

  return (
    <div>
      {renderPlaylistList()}
    </div>
  )
}

export default PlaylistList
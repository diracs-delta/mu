import BaseSearchInput from 'src/components/inputs/BaseSearchInput'

interface Props {
  onPlaylistSelect: (playlist: Playlist) => void
}

function PlaylistSearchInput (props: Props) {
  return (
    <BaseSearchInput
      searchIn='playlists'
      onPlaylistSelect={props.onPlaylistSelect}
    />
  )
}

export default PlaylistSearchInput
import BaseTile from 'src/components/tiles/BaseTile'

interface Props {
  album: Album
  playAlbum: () => void
}

function AlbumTile (props: Props) {
  return (
    <BaseTile
      group={{ ...props.album, type: 'album' }}
      playGroup={props.playAlbum}
    />
  )
}

export default AlbumTile
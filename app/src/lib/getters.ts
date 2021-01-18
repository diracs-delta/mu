/**
 * lib functions that perform synchronous searches through arrays, that
 * automatically throw exceptions if not found.
 */

function getAlbum (albums: Album[] | AlbumAPIResponse[], album_id: number) {
  const album = albums.find(album => album.id === album_id)
  if (album === undefined) {
    throw new Error(`Could not find album with id=${album_id} to play!`)
  }
  return album
}

function getArtist (artists: Artist[] | ArtistAPIResponse[], artist_id: number) {
  const artist = artists.find(artist => artist_id === artist.id)
  if (artist === undefined) {
    throw new Error(`Could not find artist with id=${artist_id} to play!`)
  }
  return artist
}

function getSong(songs: Song[], song_id: number) {
  const song = songs.find(song => song.id === song_id)
  if (song === undefined) {
    throw new Error(`Could not find playlist entry with song id=${song_id} to play!`)
  }
  return song
}

const get =  {
  album: getAlbum,
  artist: getArtist,
  song: getSong
}

export default get
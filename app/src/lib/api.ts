import get from 'src/lib/getters'

const BASE_URL = 'http://localhost:3000'

interface _serializeRawSongProps {
  rawSong: SongAPIResponse,
  rawAlbum: AlbumAPIResponse,
  rawArtist: ArtistAPIResponse
}

function _serializeRawSong (props: _serializeRawSongProps): Song {
  return {
    ...props.rawSong,
    album_title: props.rawAlbum.title,
    album_id: props.rawAlbum.id,
    artist_id: props.rawArtist.id,
    artist_name: props.rawArtist.name,
  }
}

interface _serializeRawSongsProps {
  rawSongs: SongAPIResponse[]
  rawAlbums: AlbumAPIResponse[]
  rawArtists: ArtistAPIResponse[]
}

function _serializeRawSongs (props: _serializeRawSongsProps): Song[] {
  return props.rawSongs.map(rawSong => {
    const rawAlbum = get.album(props.rawAlbums, rawSong.album_id)
    const rawArtist = get.artist(props.rawArtists, rawAlbum.artist_id)
    return _serializeRawSong({ rawSong, rawAlbum, rawArtist })
  })
}

interface _serializeRawAlbumProps {
  rawAlbum: AlbumAPIResponse
  rawArtist: ArtistAPIResponse
}

export function _serializeRawAlbum (props: _serializeRawAlbumProps): Album {
  return {
    ...props.rawAlbum,
    artist_name: props.rawArtist.name
  }
}

interface _serializeRawAlbumsProps {
  rawAlbums: AlbumAPIResponse[]
  rawArtists: ArtistAPIResponse[]
}

function _serializeRawAlbums (props: _serializeRawAlbumsProps): Album[] {
  return props.rawAlbums.map(rawAlbum => {
    const rawArtist = get.artist(props.rawArtists, rawAlbum.artist_id)
    return _serializeRawAlbum({ rawAlbum, rawArtist })
  })
}

interface fetchSongsProps {
  q?: string
  album_id?: number
  playlist_id?: number
}

export function fetchSongs (props: fetchSongsProps) {
  let url = `${BASE_URL}/songs`
  if (props.q) {
    url += `?q=${props.q}`
  }
  if (props.album_id) {
    url += `?album_id=${props.album_id}`
  }
  if (props.playlist_id) {
    url += `?playlist_id=${props.playlist_id}`
  }
  console.log(url)

  return new Promise<Array<Song>>((resolve, reject) => {
    Promise.all([fetchRawSongs(url), fetchRawAlbums(), fetchRawArtists()])
      .then((resps: [SongAPIResponse[], AlbumAPIResponse[], ArtistAPIResponse[]]) => {
        const [rawSongs, rawAlbums, rawArtists] = resps
        let songs = _serializeRawSongs({ rawSongs, rawAlbums, rawArtists })
        
        // sort songs by album_index if album_id is specified
        songs.sort((first, second) => {
          if (first.album_index < second.album_index) {
            return -1
          } else {
            return 1
          }
        })

        resolve(songs)
      })
  })
}

export function fetchPlaylistSongs (playlist: Playlist) {
  return new Promise<PlaylistSong[]>((resolve, reject) => {
    Promise.all([fetchSongs({ playlist_id: playlist.id }), fetchPlaylistEntries(playlist)])
      .then((resps: [Song[], PlaylistEntry[]]) => {
        const [songs, playlistEntries]  = resps
        const playlistSongs = playlistEntries.map(playlistEntry => {
          const song = get.song(songs, playlistEntry.song_id)
          return {
            ...song,
            playlist_name: playlist.name,
            playlist_id: playlist.id,
            playlist_index: playlistEntry.index,
            playlist_entry_id: playlistEntry.id
          }
        })
        resolve(playlistSongs)
      })
  })
}

export function fetchPlaylistEntries (playlist: Playlist) {
  const url = `${BASE_URL}/playlists/${playlist.id}/entries`
  return new Promise<PlaylistEntry[]>((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then((playlistEntries: PlaylistEntry[]) => resolve(playlistEntries))
  })
}

export function fetchRawSongs (url: string) {
  return new Promise<SongAPIResponse[]>((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then((rawSongs: SongAPIResponse[]) => {
        resolve(rawSongs)
      })
  })
}

export function fetchAlbums () {
  return new Promise<Album[]>((resolve, reject) => {
    Promise.all([fetchRawAlbums(), fetchRawArtists()])
      .then((resps: [AlbumAPIResponse[], ArtistAPIResponse[]]) => {
        const [rawAlbums, rawArtists] = resps
        resolve(_serializeRawAlbums({ rawAlbums, rawArtists }))
      })
  })
}

export function fetchRawAlbums () {
  return new Promise<AlbumAPIResponse[]>((resolve, reject) => {
    fetch(`${BASE_URL}/albums`)
      .then(response => response.json())
      .then((albums: AlbumAPIResponse[]) => {
        resolve(albums)
      })
  })
}

export function fetchRawArtists () {
  return new Promise<ArtistAPIResponse[]>((resolve, reject) => {
    fetch(`${BASE_URL}/artists`)
      .then(response => response.json())
      .then((artists: ArtistAPIResponse[]) => {
        resolve(artists)
      })
  })
}

interface fetchPlaylistProps {
  q?: string
}

export function fetchPlaylists (props: fetchPlaylistProps) {
  let url = `${BASE_URL}/playlists`
  if (props.q) {
    url += `?q=${props.q}`
  }

  return new Promise<Playlist[]>((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then((playlists: Playlist[]) => {
        resolve(playlists)
      })
  })
}

interface uploadSongProps {
  song_title: string
  album_title: string
  album_index: string
  artist_name: string
  file: File | undefined
}

export function uploadSong (props: uploadSongProps) {
  if (props.file === undefined) {
    throw new Error('File is undefined')
  }
  const form = new FormData()
  form.append('song_title', props.song_title)
  form.append('album_title', props.album_title)
  form.append('album_index', props.album_index)
  form.append('artist_name', props.artist_name)
  form.append('file', props.file)

  fetch(`${BASE_URL}/songs`, {
    method: 'POST',
    body: form
  })
}

export function uploadPlaylist(name: string) {
  fetch(`${BASE_URL}/playlists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  })
}

export function deleteRecord (record: TypedRecord) {
  let path: string
  if (record.type === 'song') {
    path = `songs/${record.id}`
  } else if (record.type === 'album') {
    path = `albums/${record.id}`
  } else if (record.type === 'playlist') {
    path = `playlists/${record.id}`
  } else if (record.type === 'playlistSong') {
    path = `playlists/${record.playlist_id}/entries/${record.playlist_entry_id}`
  } else {
    path = 'idk this should never happen'
  }
  const url = `http://localhost:3000/${path}`
  fetch(url, { method: 'DELETE' })
}

export function renameRecord (record: TypedRecord, newName: string) {
  let path: string
  let nameColumn: string
  if (record.type === 'album') {
    path = 'albums'
    nameColumn = 'title'
  } else if (record.type === 'song') {
    path = 'songs'
    nameColumn = 'title'
  } else {
    path = 'playlists'
    nameColumn = 'name'
  }

  const url = `${BASE_URL}/${path}/${record.id}`
  fetch (url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ [nameColumn]: newName })
  })
}

export function addSongToPlaylist (song: Song, playlist: Playlist) {
  const url = `${BASE_URL}/playlists/${playlist.id}/entries`
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playlist_id: playlist.id, song_id: song.id })
  })
}
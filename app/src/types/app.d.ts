import type { OverridableComponent } from "@material-ui/core/OverridableComponent";
import type { SvgIconTypeMap } from '@material-ui/core'
import { Howl } from "howler";

declare global {
  // helper type for Material UI component library
  type MUISvgIcon = OverridableComponent<SvgIconTypeMap>

  /**
   * info interfaces are identical to api responses, but include additional
   * information from their parent that is commonly fetched to save another api
   * request (e.g. parent title/name)
   */

  interface Song {
    id: number
    title: string
    duration: number
    album_title: string
    album_id: number
    album_index: number
    artist_id: number
    artist_name: string
  }

  interface PlayableSong extends Song {
    audio: Howl
    audioID: number
  }

  interface TypedSong extends Song {
    type: 'song'
  }

  interface SongAPIResponse {
    id: number
    title: string
    duration: number
    album_id: number
    album_index: number
    created_at: string
    updated_at: string
  }

  interface Album {
    id: number
    title: string
    artist_id: number
    artist_name: string
    created_at: string
    updated_at: string
  }

  interface TypedAlbum extends Album {
    type: 'album'
  }

  interface AlbumAPIResponse {
    id: number
    title: string
    artist_id: number
    created_at: string
    updated_at: string
  }


  interface Artist {
    id: number
    name: string
    created_at: string
    updated_at: string
  }

  interface TypedArtist extends Artist {
    type: 'artist'
  }

  interface ArtistAPIResponse {
    id: number
    name: string
    created_at: string
    updated_at: string
  }

  interface Playlist {
    id: number
    name: string
    created_at: string
    updated_at: string
  }

  interface PlaylistEntry {
    playlist_id: number
    song_id: number
    id: number
    index: number
  }

  interface PlaylistSong extends Song {
    playlist_name: string
    playlist_id: number
    playlist_index: number
    playlist_entry_id: number
  }

  interface TypedPlaylist extends Playlist {
    type: 'playlist'
  }

  interface TypedPlaylistSong extends PlaylistSong {
    type: 'playlistSong'
  }

  interface PlaylistAPIResponse {
    id: number
    name: string
    created_at: string
    updated_at: string
  }

  type Record = Song | Album | Playlist | PlaylistSong
  type TypedRecord = TypedSong | TypedAlbum | TypedPlaylist | TypedPlaylistSong
  type Group = Album | Playlist
  type TypedGroup = TypedAlbum | TypedPlaylist
}
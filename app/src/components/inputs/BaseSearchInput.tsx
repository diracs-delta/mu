import React, { useState } from 'react'
import * as api from 'src/lib/api'
import SongList from 'src/components/lists/SongList'

import { TextField } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'
import PlaylistList from 'src/components/lists/PlaylistList'

interface PlaylistSearch {
  type: 'playlists'
  results: Playlist[]
}

interface SongSearch {
  type: 'songs'
  results: Song[]
}

type Search = null | PlaylistSearch | SongSearch
export type SearchState = 'none' | 'searching' | 'searched'
export type SearchGroup = 'songs' | 'playlists'
type SearchEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>

interface Props {
  searchIn: SearchGroup
  onPlaylistSelect?: (playlist: Playlist) => void
}

function BaseSearchInput (props: Props) {
  const [searchState, setSearchState] = useState('none' as SearchState)
  const [search, setSearch] = useState(null as Search)
  let timeout: number | undefined = undefined

  function searchGroup (searchQuery: string) {
    switch (props.searchIn) {
      case 'songs': {
        api.fetchSongs({ q: searchQuery }).then((results) => {
          setSearchState('searched')
          setSearch({ results, type: 'songs' })
        })
        break
      }
      case 'playlists': {
        api.fetchPlaylists({ q: searchQuery }).then((results) => {
          setSearchState('searched')
          setSearch({ results, type: 'playlists' })
        })
        break
      }
    }
  }

  function onSearch (event: SearchEvent) {
    const searchQuery = event.target.value
    if (searchQuery === '') {
      setSearchState('none')
      setSearch(null)
      return
    }
    setSearchState('searching')
    searchGroup(searchQuery)
  }


  function newTimeout (event: SearchEvent) {
    timeout = window.setTimeout(() => {
      onSearch(event)
      timeout = undefined
    }, 500)
  }

  function waitAndSearch (event: SearchEvent) {
    if (timeout === undefined) {
      newTimeout(event)
    } else {
      clearTimeout(timeout)
      newTimeout(event)
    }
  }

  function renderSearchResultList () {
    if (search === null) {
      return null
    } else if (search.type === 'songs') {
      return (
        <SongList songs={search.results} />
      )
    } else if (search.type === 'playlists') {
      return (
        <PlaylistList
          playlists={search.results}
          onSelect={props.onPlaylistSelect}
        />
      )
    }
  }

  function renderSearchResults () {
    switch (searchState) {
      case 'none': {
        return null
      }
      case 'searching': {
        return (
          <CircularProgress />
        )
      }
      case 'searched': {
        if (search === null) {
          return null
        } else if (search.results.length === 0) {
          return (
            <div>No search results found!</div>
          )
        } else {
          return (
            <div>
              {renderSearchResultList()}
            </div>
          )
        }
      }
    }
  }

  return (
    <div>
      <TextField
        label='Search'
        onChange={(e) => {waitAndSearch(e)}}
      />
      {renderSearchResults()}
      <div style={{ height: 10 }} />
    </div>
  )
}

export default BaseSearchInput
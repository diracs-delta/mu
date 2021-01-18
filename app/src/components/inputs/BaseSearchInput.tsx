import React from 'react'
import * as api from 'src/lib/api'
import SongList from 'src/components/lists/SongList'

import { Menu } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'
import PlaylistList from 'src/components/lists/PlaylistList'

export type SearchState = 'none' | 'searching' | 'searched'
export type SearchGroup = 'songs' | 'playlists'

interface PlaylistSearch {
  type: 'playlists'
  results: Playlist[]
}

interface SongSearch {
  type: 'songs'
  results: Song[]
}

type Search = null | PlaylistSearch | SongSearch

interface Props {
  searchIn: SearchGroup
  onPlaylistSelect?: (playlist: Playlist) => void
}

interface State {
  searchState: SearchState
  search: Search
}

class BaseSearchInput extends React.Component<Props, State> {
  timeout: number | undefined

  constructor (props: Props) {
    super(props)
    this.state = {
      searchState: 'none',
      search: null,
    }
    this.timeout = undefined
  }

  searchGroup (searchQuery: string) {
    if (this.props.searchIn === 'songs') {
      api.fetchSongs({ q: searchQuery }).then((results) => {
        this.setState({
          searchState: 'searched',
          search: { results, type: 'songs' }
        })
      })
    } else if (this.props.searchIn === 'playlists') {
      api.fetchPlaylists({ q: searchQuery }).then((results) => {
        this.setState({
          searchState: 'searched',
          search: { results, type: 'playlists' }
        })
      })
    }
  }

  onSearch (event: any) {
    const searchQuery = event.target.value as string
    if (searchQuery === '') {
      this.setState({
        searchState: 'none',
        search: null
      })
      return
    }
    this.setState({ searchState: 'searching' })
    this.searchGroup(searchQuery)
  }


  newTimeout (event: React.ChangeEvent<Element>) {
    this.timeout = window.setTimeout(() => {
      this.onSearch(event)
      this.timeout = undefined
    }, 500)
  }

  waitAndSearch (event: React.ChangeEvent<Element>) {
    if (this.timeout === undefined) {
      this.newTimeout(event)
    } else {
      clearTimeout(this.timeout)
      this.newTimeout(event)
    }
  }

  renderSearchResultList () {
    if (this.state.search === null) {
      return null
    } else if (this.state.search.type === 'songs') {
      return (
        <SongList songs={this.state.search.results} />
      )
    } else if (this.state.search.type === 'playlists') {
      return (
        <PlaylistList
          playlists={this.state.search.results}
          onSelect={this.props.onPlaylistSelect}
        />
      )
    }
  }

  renderSearchResults () {
    switch (this.state.searchState) {
      case 'none': {
        return null
      }

      case 'searching': {
        return (
          <CircularProgress />
        )
      }

      case 'searched': {
        if (this.state.search === null) {
          return null
        } else if (this.state.search.results.length === 0) {
          return (
            <div>No search results found!</div>
          )
        } else {
          return (
            <div>
              {this.renderSearchResultList()}
            </div>
          )
        }
      }
    }
  }

  render () {
    return (
      <div>
        <TextField
          label='Search'
          onChange={(e) => {this.waitAndSearch(e)}}
        />
        {this.renderSearchResults()}
        <div style={{ height: 10 }} />
      </div>
    )
  }
}

export default BaseSearchInput
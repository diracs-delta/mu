import React from 'react'
import { Howl, Howler } from 'howler'

import MainLayout from './layouts/MainLayout'
import PlayerPage from 'src/pages/PlayerPage'
import LibraryPage from 'src/pages/LibraryPage'
import PlaylistsPage from 'src/pages/PlaylistsPage'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'

const defaultInitQueue: Array<Song> = [
  {
    id: 1,
    title: 'Night in Venice',
    duration: 222,
    album_id: 1,
    album_title: 'Jazzy Tunes',
    album_index: 2,
    artist_id: 1,
    artist_name: 'Kevin Macleod',
  },
  {
    id: 4,
    title: 'Electro Cabello',
    duration: 222,
    album_id: 2,
    album_title: 'Disco Beats',
    album_index: 2,
    artist_id: 1,
    artist_name: 'Kevin Macleod',
  },
  {
    id: 7,
    title: 'Ether Vox',
    duration: 222,
    album_id: 3,
    album_title: 'Techno Bops',
    album_index: 2,
    artist_id: 1,
    artist_name: 'Kevin Macleod',
  }
]

interface AppProps {}
interface AppState {
  queue: Array<PlayableSong>
  index: number
  duration: number
  progress: number
  playbackState: 'loading' | 'playing' | 'paused' | 'initial'
  repeatState: 'none' | 'queue' | 'single'
  shuffle: boolean
}
export default class App extends React.Component<AppProps, AppState> {
  animationID: number
  animating: boolean

  constructor (props: AppProps) {
    super(props)
    this.animationID = -1
    this.animating = false

    // retrieve queue from cookies if possible
    let initQueue
    const savedQueue = localStorage.getItem('queue')
    initQueue = (savedQueue === null) ? defaultInitQueue : JSON.parse(savedQueue)

    this.state = {
      queue: App._initNewQueue(initQueue),
      index: 0,
      duration: 0,
      progress: 0,
      playbackState: 'initial',
      repeatState: 'none',
      shuffle: false
    }
    console.log(this.state.queue)
    this._loadCurrentAudio()
    // bindings
    this.togglePlayback = this.togglePlayback.bind(this)
    this.previous = this.previous.bind(this)
    this.next = this.next.bind(this)
    this.setProgress = this.setProgress.bind(this)
    this.setQueue = this.setQueue.bind(this)
  }

  static _initNewQueue(queueSongs: Array<Song>) {
    // save queue to localStorage
    localStorage.setItem('queue', JSON.stringify(queueSongs))
    // first unload all audio files from memory
    Howler.unload()
    // map queueInfo to new queue
    console.log(queueSongs)
    const queue: Array<PlayableSong> = queueSongs.map(song => {
      return {
        ...song,
        audio: new Howl({
          src: `http://localhost:3000/songs/${song.id}/audio`,
          preload: false,
          format: ['mp3', 'wav']
        }),
        audioID: -1
      }
    })
    return queue
  }

  setQueue (queueInfo: Array<Song>) {
    this.stop()
    const queue = App._initNewQueue(queueInfo)
    this.setState({ queue, index: 0 }, () => {
      this._loadCurrentAudio()
    })
  }

  _loadCurrentAudio (onLoad?: () => void) {
    if (this.currentAudio.state() === 'unloaded') {
      this.setState({ playbackState: 'loading' })
      this.currentAudio.load()
      this.currentAudio.once('load', () => {
        this.setState({
          playbackState: 'paused',
          duration: this.currentAudio.duration()
        })
        if (onLoad !== undefined) {
          onLoad()
        }
      })
      this.currentAudio.once('end', () => {
        this.next()
      })
    } else if (this.currentAudio.state() === 'loading') {
      throw new Error('App#_loadCurrentAudio called twice! This should never happen.')
    } else {
      // song already loaded, just set the current song duration and call onLoad
      this.setState({ duration: this.currentAudio.duration() })
      if (onLoad !== undefined) {
        onLoad()
      }
    }
  }

  play () {
    if (this.currentAudioID === -1) {
      this.currentAudioID = this.currentAudio.play()
    } else {
      this.currentAudio.play(this.currentAudioID)
    }
    this.setState({ playbackState: 'playing' })
    this.startUpdatingProgress()
  }

  pause () {
    this.currentAudio.pause(this.currentAudioID)
    this.setState({ playbackState: 'paused' })
    this.stopUpdatingProgress()
  }

  stop () {
    this.currentAudio.stop(this.currentAudioID)
    this.stopUpdatingProgress()
  }

  togglePlayback () {
    if (this.state.playbackState === 'paused') {
      this.play()
    } else {
      this.pause()
    }
  }

  /**
   * computes index of next song based on current state, then loads the next song.
   * by default, the priority (in decreasing order) is as follows:
   *   single repeat -> shuffle -> queue repeat -> normal increment
   */
  next () {
    let newIndex
    if (this.state.repeatState === 'single') {
      // if repeat state is single, keep index at current song
      newIndex = this.state.index
    } else if (this.state.shuffle) {
      // if in shuffle mode, pick a random distinct index
      const max = this.state.queue.length
      newIndex = Math.floor(Math.random() * max)
      do {
        newIndex = Math.floor(Math.random() * max)
      } while (newIndex === this.state.index)
    } else if (this.state.repeatState === 'queue' && this.state.index === this.state.queue.length - 1) {
      // if repeat state is queue and at end of song, then set index to 0
      newIndex = 0
    } else if (this.state.index < this.state.queue.length - 1) {
      // if in middle of queue and queue state != single, just increment 
      newIndex = this.state.index + 1
    } else {
      // otherwise, if at end of queue and queue state == none, do nothing
      return
    }
    // stop current audio
    this.stop()
    this.setState({
      index: newIndex
    }, () => {
      if (this.state.playbackState !== 'playing') {
        this._loadCurrentAudio()
      } else {
        this._loadCurrentAudio(() => this.play())
      }
    })
  }

  previous () {
    if (this.state.index > 0) {
      this.stop()
      this.setState({
        index: this.state.index - 1
      }, () => {
        if (this.state.playbackState !== 'playing') {
          this._loadCurrentAudio()
        } else {
          this._loadCurrentAudio(() => this.play())
        }
      })
    }
  }

  shuffle () {
    this.setState({ shuffle: true })
  }

  unshuffle () {
    this.setState({ shuffle: false })
  }

  toggleShuffle () {
    if (this.state.shuffle) {
      this.unshuffle()
    } else {
      this.shuffle()
    }
  }

  _updateProgress () {
    this.animationID = requestAnimationFrame(() => {
      console.log('executing frame: ' + this.animationID)
      this.setState({
        progress: this.currentAudio.seek() as number
      })
      this._updateProgress()
    })
    console.log('requested frame: ' + this.animationID)
  }

  startUpdatingProgress () {
    if (!this.animating) {
      this.animating = true
      this.animationID = requestAnimationFrame(() => this._updateProgress())
    }
  }

  stopUpdatingProgress () {
    if (this.animating) {
      cancelAnimationFrame(this.animationID)
      this.animating = false
      console.log('stopped frame: ' + this.animationID)
    }
  }

  setProgress (event: object, progress: number | number[]) {
    if (progress instanceof Array) {
      progress = progress[0]
    }
    this.setState({ progress })
    this.currentAudio.seek(progress)
  }

  iterRepeatState () {
    let newRepeatState: AppState['repeatState']
    if (this.state.repeatState === 'none') {
      newRepeatState = 'queue'
    } else if (this.state.repeatState === 'queue') {
      newRepeatState = 'single'
    } else {
      newRepeatState = 'none'
    }
    this.setState({
      repeatState: newRepeatState
    })
  }

  get currentSong () {
    return this.state.queue[this.state.index]
  }

  get currentAudio () {
    return this.state.queue[this.state.index].audio
  }

  get currentAudioID () {
    return this.state.queue[this.state.index].audioID
  }

  set currentAudioID (id: number) {
    let queue = this.state.queue
    queue[this.state.index].audioID = id
    this.setState({ queue })
  }

  render () {
    return (
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route path="/player">
              <PlayerPage
                togglePlayback={this.togglePlayback}
                playbackState={this.state.playbackState}
                previous={this.previous}
                next={this.next}
                duration={this.state.duration}
                progress={this.state.progress}
                setProgress={this.setProgress}
                currentSong={this.currentSong}
                queue={this.state.queue}
                repeatState={this.state.repeatState}
                iterRepeatState={() => this.iterRepeatState()}
                shuffle={this.state.shuffle}
                toggleShuffle={() => this.toggleShuffle()}
              />
            </Route>
            <Route path="/library">
              <LibraryPage
                setQueue={this.setQueue}
              />
            </Route>
            <Route path="/playlist">
              <PlaylistsPage
                setQueue={this.setQueue}
              />
            </Route>
            <Route path="/">
              <Redirect to="/player" />
            </Route>
          </Switch>
        </MainLayout>
      </BrowserRouter>
    )
  }
}

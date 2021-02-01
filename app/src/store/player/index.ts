import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Howler } from 'howler'

export interface PlayerState {
  queue: Song[]
  index: number
  volume: number
  duration: number
  progress: number
  seekValue: number
  repeat: 'none' | 'queue' | 'single'
  shuffle: boolean
}

const previousQueue = localStorage.getItem('queue')
const defaultInitialQueue: Array<Song> = [
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

const initialQueue: Song[] = previousQueue ? JSON.parse(previousQueue) : defaultInitialQueue
const initialState: PlayerState = {
  queue: initialQueue,
  index: 0,
  volume: 1.0,
  duration: 0,
  progress: 0,
  seekValue: 0,
  repeat: 'none',
  shuffle: false
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setVolume (state, action: PayloadAction<number>) {
      state.volume = action.payload
      Howler.volume(action.payload)
    },
    toggleShuffle (state) {
      if (state.shuffle) {
        state.shuffle = false
      } else {
        state.shuffle = true
      }
    },
    incrementRepeat (state) {
      switch (state.repeat) {
      case 'none':
        state.repeat = 'queue'
        break
      case 'queue':
        state.repeat = 'single'
        break
      case 'single':
        state.repeat = 'none'
        break
      }
    },
    setDuration (state, action: PayloadAction<number>) {
      state.duration = action.payload
    },
    setProgress (state, action: PayloadAction<number>) {
      state.progress = action.payload
    },
    seekTo (state, action: PayloadAction<number>) {
      console.log('why this no work')
      state.progress = action.payload
      state.seekValue = action.payload
    }
  }
})

export default playerSlice.reducer
export const {
  setVolume,
  toggleShuffle,
  incrementRepeat,
  setDuration,
  setProgress,
  seekTo
} = playerSlice.actions
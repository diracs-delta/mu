import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Howler } from 'howler'

export interface PlayerState {
  volume: number
}

const initialState = {
  volume: 1.0 
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setVolume (state, action: PayloadAction<number>) {
      state.volume = action.payload
      Howler.volume(action.payload)
    }
  }
})

export default playerSlice.reducer
export const { setVolume } = playerSlice.actions
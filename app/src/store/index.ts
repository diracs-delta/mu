import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import playbackReducer, { PlayerState } from 'src/store/player'

export interface RootState {
  player: PlayerState
}

export default configureStore({
  reducer: {
    player: playbackReducer
  },
  devTools: true
})

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
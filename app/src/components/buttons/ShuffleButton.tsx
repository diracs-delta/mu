import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'src/store'
import { toggleShuffle } from 'src/store/player'

import { IconButton } from '@material-ui/core'
import { Shuffle } from '@material-ui/icons'

function ShuffleIcon (props: { shuffle: boolean }) {
  const color = (props.shuffle) ? 'primary' : 'disabled'
  return <Shuffle color={color} />
}

function ShuffleButton () {
  const shuffle = useTypedSelector(state => state.player.shuffle)
  const dispatch = useDispatch()

  return (
    <IconButton
      onClick={() => dispatch(toggleShuffle())}
    >
      <ShuffleIcon shuffle={shuffle} />
    </IconButton>
  )
}

export default ShuffleButton
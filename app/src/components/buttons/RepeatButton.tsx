import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'src/store'
import { incrementRepeat } from 'src/store/player'

import { IconButton } from '@material-ui/core'
import { Repeat, RepeatOne } from '@material-ui/icons'

function RepeatIcon (props: { repeat: 'none' | 'queue' | 'single' }) {
  switch (props.repeat) {
    case 'none': 
      return <Repeat color="disabled" />
    case 'queue':
      return <Repeat color='primary' />
    case 'single':
      return <RepeatOne color='primary' />
  }
}

function RepeatButton () {
  const repeat = useTypedSelector(state => state.player.repeat)
  const dispatch = useDispatch()

  return (
    <IconButton
      onClick={() => dispatch(incrementRepeat())}
    >
      <RepeatIcon repeat={repeat}/>
    </IconButton>
  )
}

export default RepeatButton
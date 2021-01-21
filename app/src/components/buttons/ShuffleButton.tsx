import { IconButton } from '@material-ui/core'
import { Shuffle } from '@material-ui/icons'

function getShuffleIcon (shuffle: boolean) {
  const color = (shuffle) ? 'primary' : 'disabled'
  return <Shuffle color={color} />
}

interface Props {
  shuffle: boolean
  toggleShuffle: () => void
}

function ShuffleButton (props: Props) {
  return (
    <IconButton
      onClick={props.toggleShuffle}
    >
      {getShuffleIcon(props.shuffle)}
    </IconButton>
  )
}

export default ShuffleButton
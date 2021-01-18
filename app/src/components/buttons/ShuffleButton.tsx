import { IconButton } from '@material-ui/core'
import { Shuffle } from '@material-ui/icons'

function getShuffleIcon (shuffle: boolean) {
  const color = (shuffle) ? 'primary' : 'disabled'
  return <Shuffle color={color} />
}

interface ShuffleButtonProps {
  shuffle: boolean
  toggleShuffle: () => void
}

export default function ShuffleButton (props: ShuffleButtonProps) {
  return (
    <IconButton
      onClick={props.toggleShuffle}
    >
      {getShuffleIcon(props.shuffle)}
    </IconButton>
  )
}
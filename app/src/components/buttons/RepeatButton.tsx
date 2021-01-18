import { IconButton } from '@material-ui/core'
import { Repeat, RepeatOne } from '@material-ui/icons'

function getRepeatIcon (repeatState: 'none' | 'queue' | 'single') {
  if (repeatState === 'none') {
    return <Repeat color="disabled" />
  } else if (repeatState === 'queue') {
    return <Repeat color="primary" />
  } else {
    return <RepeatOne color="primary" />
  }
}

interface RepeatButtonProps {
  repeatState: 'none' | 'queue' | 'single'
  iterRepeatState: () => void
}

export default function RepeatButton (props: RepeatButtonProps) {
  return (
    <IconButton
      onClick={props.iterRepeatState}
    >
      {getRepeatIcon(props.repeatState)}
    </IconButton>
  )
}

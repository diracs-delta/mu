import { IconButton } from '@material-ui/core'
import { Repeat, RepeatOne } from '@material-ui/icons'

function getRepeatIcon (repeatState: 'none' | 'queue' | 'single') {
  switch (repeatState) {
    case 'none': 
      return <Repeat color="disabled" />
    case 'queue':
      return <Repeat color='primary' />
    case 'single':
      return <RepeatOne color='primary' />
  }
}

interface Props {
  repeatState: 'none' | 'queue' | 'single'
  iterRepeatState: () => void
}

function RepeatButton (props: Props) {
  return (
    <IconButton
      onClick={props.iterRepeatState}
    >
      {getRepeatIcon(props.repeatState)}
    </IconButton>
  )
}

export default RepeatButton
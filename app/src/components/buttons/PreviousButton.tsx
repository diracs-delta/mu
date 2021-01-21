import { SkipPrevious } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

interface Props {
  previous: () => void
}

function PreviousButton (props: Props) {
  return (
    <IconButton
      color="primary" 
      onClick={props.previous}
    >
      <SkipPrevious style={{fontSize: 60}} />
    </IconButton>
  )
}

export default PreviousButton
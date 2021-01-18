import { SkipPrevious } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

interface PreviousButtonProps {
  previous: () => void
}
export default function PreviousButton (props: PreviousButtonProps) {
  return (
    <IconButton
      color="primary" 
      onClick={props.previous}
    >
      <SkipPrevious style={{fontSize: 60}} />
    </IconButton>
  )
}
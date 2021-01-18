import { IconButton } from '@material-ui/core'
import { SkipNext } from '@material-ui/icons'

interface NextButtonProps {
  next: () => void
}
export default function NextButton (props: NextButtonProps) {
  return (
    <IconButton
      color="primary" 
      onClick={props.next}
    >
      <SkipNext style={{ fontSize: '60px' }}/>
    </IconButton>
  )
}
import { IconButton } from '@material-ui/core'
import { SkipNext } from '@material-ui/icons'

interface Props {
  next: () => void
}

function NextButton (props: Props) {
  return (
    <IconButton
      color="primary" 
      onClick={props.next}
    >
      <SkipNext style={{ fontSize: '60px' }}/>
    </IconButton>
  )
}

export default NextButton
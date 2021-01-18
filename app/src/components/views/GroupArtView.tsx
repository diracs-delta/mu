import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'

/* CSS */
const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
  createStyles({
    albumArt: props => ({
      height: props.size,
      width: props.size,
      background: `url(http://localhost:3000/${props.groupType}s/${props.id}/art)`,
      backgroundSize: 'contain',
      backgroundColor: '#90EE90'
    })
  })
)

/* JSX */
interface Props {
  groupType: 'album' | 'playlist'
  id: number
  size: number
}

function GroupArtView (props: Props) {
  const classes = useStyles(props)
  return (
    <Card className={classes.albumArt} elevation={4} square />
  )
}

export default GroupArtView
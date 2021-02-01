import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { WithStyles, withStyles } from '@material-ui/core/styles'

import GroupArtView from 'src/components/views/GroupArtView'
import RepeatButton from 'src/components/buttons/RepeatButton'
import PreviousButton from 'src/components/buttons/PreviousButton'
import PlayButton from 'src/components/buttons/PlayButton'
import NextButton from 'src/components/buttons/NextButton'
import ProgressSlider from 'src/components/sliders/ProgressSlider'
import CollapsibleQueueList from 'src/components/lists/CollapsibleQueueList'
import ShuffleButton from 'src/components/buttons/ShuffleButton'
import VolumeSlider from 'src/components/sliders/VolumeSlider'

/* CSS */
const styles = {
  container: {
    backgroundColor: '#90EE90',
    height: '100%',
    padding: 30,
  }
}

/* JSX */
interface PlayerProps extends WithStyles<typeof styles> {
  togglePlayback: () => void
  playbackState: 'paused' | 'playing' | 'loading' | 'initial'
  next: () => void
  previous: () => void
  currentSong: PlayableSong
  queue: Array<PlayableSong>
}

interface PlayerState {}

class Player extends React.Component<PlayerProps, PlayerState> {
  render () {
    const { classes } = this.props
    return (
      <Container className={classes.container} maxWidth="md">
        <Grid container justify="center">
          <Grid container justify="center">
            <GroupArtView size={400} groupType='album' id={this.props.currentSong.album_id}/>
          </Grid>
          <Grid container>
            <ProgressSlider />
          </Grid>
          <Grid container justify="center">
            <RepeatButton />
            <PreviousButton previous={this.props.previous} />
            <PlayButton
              playbackState={this.props.playbackState}
              togglePlayback={this.props.togglePlayback}
            />
            <NextButton next={this.props.next} />
            <ShuffleButton />
          </Grid>
          <Grid container>
            <VolumeSlider />
          </Grid>
          <Grid>
            <CollapsibleQueueList
              currentSong={this.props.currentSong}
              queue={this.props.queue}
            />
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(Player)
import React from 'react'
import { CircularProgress, IconButton } from '@material-ui/core'
import { PlayArrow, Pause } from '@material-ui/icons'

interface Props {
  playbackState: 'paused' | 'playing' | 'loading' | 'initial'
  togglePlayback: () => void
}

function getPlaybackIcon (state: Props['playbackState']) {
  let PlaybackIcon;
  switch (state) {
    case 'paused': {
      PlaybackIcon = PlayArrow
      break
    }
    case 'playing': {
      PlaybackIcon = Pause
      break
    }
    default: {
      PlaybackIcon = CircularProgress
    }
  }

  return (
    <PlaybackIcon style={{ fontSize: 60 }}/>
  )
}

function PlayButton (props: Props) {
  return (
    <IconButton
      color="primary"
      onClick={props.togglePlayback}
      disabled={props.playbackState === 'loading' || props.playbackState === 'initial'}
    >
      {getPlaybackIcon(props.playbackState)}
    </IconButton>
  )
}

export default PlayButton
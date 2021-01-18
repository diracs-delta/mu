import React from 'react'
import { CircularProgress, IconButton } from '@material-ui/core'
import { PlayArrow, Pause } from '@material-ui/icons'

interface PlayButtonState {}
interface PlayButtonProps {
  playbackState: 'paused' | 'playing' | 'loading' | 'initial'
  togglePlayback: () => void
}

function getPlaybackIcon (state: PlayButtonProps["playbackState"]) {
  let PlaybackIcon;
  if (state === 'paused') {
    PlaybackIcon = PlayArrow
  } else if (state === 'playing' ) {
    PlaybackIcon = Pause
  } else {
    PlaybackIcon = CircularProgress
  }
  return (
    <PlaybackIcon style={{ fontSize: 60 }}/>
  )
}

export default function PlayButton (props: PlayButtonProps) {
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
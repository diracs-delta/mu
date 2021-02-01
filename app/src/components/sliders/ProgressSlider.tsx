import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'src/store'
import { seekTo } from 'src/store/player'

import { Grid, Slider } from '@material-ui/core'
import { timeToString } from 'src/lib/time'

export default function ProgressSlider () {
  const progress = useTypedSelector(state => state.player.progress)
  const duration = useTypedSelector(state => state.player.duration)
  const dispatch = useDispatch()
  const dispatchSeekTo = (e: object, val: number | number[]) => {
    if (val instanceof Array) {
      val = val[0]
    }
    dispatch(seekTo(val))
  }

  return (
    <Grid container>
      <Grid container item justify="space-between">
        <div>
          {timeToString(progress)}
        </div>
        <div>
          {timeToString(duration)}
        </div>
      </Grid>
      <Slider
        value={progress}
        valueLabelDisplay='auto'
        valueLabelFormat={timeToString}
        onChangeCommitted={dispatchSeekTo}
        max={duration}
      />
    </Grid>
  )
}
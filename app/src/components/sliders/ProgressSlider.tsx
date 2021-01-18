import { Grid, Slider } from '@material-ui/core'
import { timeToString } from 'src/lib/time'

interface ProgressSliderProps {
  progress: number
  setProgress: (event: object, value: number | number[]) => void
  duration: number
}

export default function ProgressSlider (props: ProgressSliderProps) {
  return (
    <Grid container>
      <Grid container item justify="space-between">
        <div>
          {timeToString(props.progress)}
        </div>
        <div>
          {timeToString(props.duration)}
        </div>
      </Grid>
      <Slider
        value={props.progress}
        valueLabelDisplay='auto'
        valueLabelFormat={timeToString}
        onChangeCommitted={props.setProgress}
        max={props.duration}
      />
    </Grid>
  )
}
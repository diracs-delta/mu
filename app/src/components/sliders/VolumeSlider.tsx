import { Grid, Slider } from '@material-ui/core'

interface ProgressSliderProps {
  volume: number
  setVolume: (event: object, value: number | number[]) => void
}

function ProgressSlider (props: ProgressSliderProps) {
  return (
    <Grid container>
      <Slider
        value={props.volume}
        valueLabelDisplay='auto'
        valueLabelFormat={(vol: number) => (vol * 100).toString().split('.')[0]}
        onChange={props.setVolume}
        step={0.01}
        max={1.0}
      />
    </Grid>
  )
}

export default ProgressSlider
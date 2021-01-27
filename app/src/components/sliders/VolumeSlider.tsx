import { Grid, Slider } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'src/store'
import { setVolume } from 'src/store/player'

function VolumeSlider () {
  const dispatch = useDispatch()
  const volume = useTypedSelector(state => state.player.volume)

  function dispatchSetVolume(event: object, value: number | number[]) {
    if (value instanceof Array) {
      value = value[0]
    }
    dispatch(setVolume(value))
  }

  return (
    <Grid container>
      <Slider
        value={volume}
        valueLabelDisplay='auto'
        valueLabelFormat={(vol: number) => (vol * 100).toString().split('.')[0]}
        onChange={dispatchSetVolume}
        step={0.01}
        max={1.0}
      />
    </Grid>
  )
}

export default VolumeSlider
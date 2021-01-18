export function timeToString (time: number) {
  const minutes = Math.floor(time / 60).toString()
  const seconds = (time % 60).toString().split('.')[0].padStart(2, '0')
  return minutes + ':' + seconds
} 
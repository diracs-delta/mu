import React from 'react'

import SongList from 'src/components/lists/SongList'
import SongDescText from 'src/components/text/SongDescText'

import { Collapse, List, ListItem } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

interface Props {
  currentSong: Song
  queue: Array<Song>
}

interface State {
  open: boolean
}

class CollapsibleQueueList extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      open: false
    }
    this.toggleOpen = this.toggleOpen.bind(this)
  }

  toggleOpen () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    return (
      <div>
        <div>
          <SongDescText song={{ ...this.props.currentSong, type: 'song' }}/>
          <IconButton
            onClick={this.toggleOpen}
          >
            <ExpandMore />
          </IconButton>
        </div>
        <Collapse in={this.state.open}>
          <SongList songs={this.props.queue} indexBy='position' />
        </Collapse>
      </div>
    )
  }
}

export default CollapsibleQueueList
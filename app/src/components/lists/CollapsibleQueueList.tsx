import React from 'react'

import SongList from 'src/components/lists/SongList'
import SongDescText from 'src/components/text/SongDescText'
import useCollapsible from 'src/hooks/useCollapsible'

import { Collapse } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

interface Props {
  currentSong: Song
  queue: Array<Song>
}

function CollapsibleQueueList (props: Props) {
  const [open, toggleOpen] = useCollapsible()

  return (
    <div>
      <div>
        <SongDescText song={{ ...props.currentSong, type: 'song' }}/>
        <IconButton
          onClick={toggleOpen}
        >
          <ExpandMore />
        </IconButton>
      </div>
      <Collapse in={open}>
        <SongList songs={props.queue} indexBy='position' />
      </Collapse>
    </div>
  )
}

export default CollapsibleQueueList
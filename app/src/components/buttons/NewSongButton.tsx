import React from 'react'
import NewSongDialog from 'src/components/dialogs/NewSongDialog'

import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

interface NewSongButtonState {
  open: boolean
}
interface NewSongButtonProps {}
class NewSongButton extends React.Component<NewSongButtonProps, NewSongButtonState> {
  constructor (props: NewSongButtonProps) {
    super(props)
    this.state = {
      open: false
    }
  }

  openDialog () {
    this.setState({ open: true })
  }

  closeDialog () {
    this.setState({ open: false })
  }

  render () {
    return (
      <React.Fragment>
        <Fab
          color='primary'
          style={{position: 'fixed', right: 30, bottom: 30}}
          onClick={() => this.openDialog()}
        >
          <Add />
        </Fab>
        <NewSongDialog
          open={this.state.open}
          closeDialog={() => this.closeDialog()}
        />
      </React.Fragment>
    )
  }
}

export default NewSongButton
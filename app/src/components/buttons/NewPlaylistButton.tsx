import React from 'react'
import NewPlaylistDialog from 'src/components/dialogs/NewPlaylistDialog'

import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

interface State {
  open: boolean
}
interface Props {}
class NewPlaylistButton extends React.Component<Props, State> {
  constructor (props: Props) {
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
        <NewPlaylistDialog
          open={this.state.open}
          closeDialog={() => this.closeDialog()}
        />
      </React.Fragment>
    )
  }
}

export default NewPlaylistButton
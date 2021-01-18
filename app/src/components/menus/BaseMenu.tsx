import React from 'react'

import { IconButton } from '@material-ui/core'
import { Menu, MenuItem } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'

export interface MenuAction {
  label: string
  callback: () => void
}

interface Props {
  menuActions: MenuAction[]
}

interface State {
  menuOpen: boolean
  menuAnchor: Element | null
}

class BaseMenu extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      menuOpen: false,
      menuAnchor: null
    }
    this.openMenuAndAnchor = this.openMenuAndAnchor.bind(this)
  }

  openMenuAndAnchor (event: React.MouseEvent<HTMLElement>) {
    this.setState({
      menuAnchor: event.currentTarget
    })
    this.setState({ menuOpen: true })
  }

  closeMenu () {
    this.setState({ menuOpen: false })
  }

  get menuItems () {
    return this.props.menuActions.map(menuAction => {
      return (
        <MenuItem
          onClick={() => {
            menuAction.callback()
            this.closeMenu()
          }}
        >
          {menuAction.label}
        </MenuItem>
      )
    })
  }

  render () {
    return (
      <React.Fragment>
        <IconButton
          color='secondary'
          onClick={this.openMenuAndAnchor}
        >
          <MoreVert />
        </IconButton>
        <Menu
          open={this.state.menuOpen}
          onClose={() => this.closeMenu()}
          anchorEl={this.state.menuAnchor}
        >
          {this.menuItems}
        </Menu>
      </React.Fragment>
    )
  }
}

export default BaseMenu
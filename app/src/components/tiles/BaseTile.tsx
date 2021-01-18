import React from 'react'
import * as api from 'src/lib/api'
import GroupArtView from 'src/components/views/GroupArtView'
import GroupDialog from '../dialogs/GroupDialog'
import RenameDialog from 'src/components/dialogs/RenameDialog'
import BaseMenu, { MenuAction } from 'src/components/menus/BaseMenu'

import { GridListTile, GridListTileBar } from '@material-ui/core'
import { IconButton, ButtonBase } from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'

interface Props {
  group: TypedGroup
  playGroup: () => void
}

interface State {
  groupDialogOpen: boolean
  renameDialogOpen: boolean
  menuOpen: boolean
  menuAnchor: Element | null
  deleted: boolean
}

class BaseTile extends React.Component <Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      groupDialogOpen: false,
      renameDialogOpen: false,
      menuOpen: false,
      menuAnchor: null,
      deleted: false
    }
  }

  openAlbumDialog () {
    this.setState({ groupDialogOpen: true })
  }

  closeAlbumDialog () {
    this.setState({ groupDialogOpen: false })
  }

  openRenameDialog () {
    this.setState({ menuOpen: false, renameDialogOpen: true })
  }

  closeRenameDialog () {
    this.setState({ renameDialogOpen: false })
  }

  openMenu () {
    this.setState({ menuOpen: true })
  }

  closeMenu () {
    this.setState({ menuOpen: false })
  }

  deleteGroup () {
    api.deleteRecord(this.props.group)
    this.closeMenu()
    this.setState({ deleted: true })
  }

  renderActionButtons () {
    const menuActions = [
      {
        label: `Delete ${this.props.group.type}`,
        callback: () => this.deleteGroup()
      },
      {
        label: `Rename ${this.props.group.type}`,
        callback: () => this.openRenameDialog()
      }
    ]

    return (
      <div>
        <IconButton
          color='secondary'
          onClick={this.props.playGroup}
        >
          <PlayArrow />
        </IconButton>
        <BaseMenu menuActions={menuActions} />
      </div>
    )
  }

  renderTileBar () {
    if (this.props.group.type === 'album') {
      return (
        <GridListTileBar
          title={this.props.group.title}
          subtitle={<span>{this.props.group.artist_name}</span>}
          actionIcon={this.renderActionButtons()}
        />
      )
    } else if (this.props.group.type === 'playlist') {
      return (
        <GridListTileBar
          title={this.props.group.name}
          actionIcon={this.renderActionButtons()}
        />
      )
    }
  }

  render () {
    if (!this.state.deleted) {
      return (
        <React.Fragment>
          <GridListTile>
            <ButtonBase
              onClick={() => this.openAlbumDialog()}
            >
              <GroupArtView
                groupType={this.props.group.type}
                id={this.props.group.id}
                size={300}
              />
            </ButtonBase>
            {this.renderTileBar()}
          </GridListTile>
          <GroupDialog
            open={this.state.groupDialogOpen}
            onClose={() => this.closeAlbumDialog()}
            group={this.props.group}
          />
          <RenameDialog
            open={this.state.renameDialogOpen}
            closeDialog={() => this.closeRenameDialog()}
            record={this.props.group}
          />
        </React.Fragment>
      )
    } else {
      return null
    }
  }
}

export default BaseTile
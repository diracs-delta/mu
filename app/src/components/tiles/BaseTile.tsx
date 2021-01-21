import React, { useState } from 'react'
import * as api from 'src/lib/api'
import GroupArtView from 'src/components/views/GroupArtView'
import GroupDialog from '../dialogs/GroupDialog'
import RenameDialog from 'src/components/dialogs/RenameDialog'
import BaseMenu from 'src/components/menus/BaseMenu'
import useDialog from 'src/hooks/useDialog'

import { GridListTile, GridListTileBar } from '@material-ui/core'
import { IconButton, ButtonBase } from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'

interface Props {
  group: TypedGroup
  playGroup: () => void
}

function BaseTile (props: Props) {
  const [groupDialogProps, setGroupDialogOpen] = useDialog()
  const [renameDialogProps, setRenameDialogOpen] = useDialog()
  const [deleted, setDeleted] = useState(false)

  function deleteGroup () {
    api.deleteRecord(props.group)
    setDeleted(true)
  }

  function renderActionButtons () {
    const menuActions = [
      {
        label: `Delete ${props.group.type}`,
        callback: () => deleteGroup()
      },
      {
        label: `Rename ${props.group.type}`,
        callback: () => setRenameDialogOpen(true)
      }
    ]

    return (
      <div>
        <IconButton
          color='secondary'
          onClick={props.playGroup}
        >
          <PlayArrow />
        </IconButton>
        <BaseMenu menuActions={menuActions} />
      </div>
    )
  }

  function renderTileBar () {
    if (props.group.type === 'album') {
      return (
        <GridListTileBar
          title={props.group.title}
          subtitle={<span>{props.group.artist_name}</span>}
          actionIcon={renderActionButtons()}
        />
      )
    } else if (props.group.type === 'playlist') {
      return (
        <GridListTileBar
          title={props.group.name}
          actionIcon={renderActionButtons()}
        />
      )
    }
  }

  if (!deleted) {
    return (
      <React.Fragment>
        <GridListTile>
          <ButtonBase
            onClick={() => setGroupDialogOpen(true)}
          >
            <GroupArtView
              groupType={props.group.type}
              id={props.group.id}
              size={300}
            />
          </ButtonBase>
          {renderTileBar()}
        </GridListTile>
        <GroupDialog {...groupDialogProps} group={props.group} />
        <RenameDialog {...renameDialogProps} record={props.group} />
      </React.Fragment>
    )
  } else {
    return null
  }
}

export default BaseTile
import React from 'react'
import useMenu from 'src/hooks/useMenu'

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

function BaseMenu (props: Props) {
  const [open, openMenu, closeMenu, menuProps] = useMenu()

  function renderMenuItems () {
    return props.menuActions.map(menuAction => {
      return (
        <MenuItem
          onClick={() => {
            menuAction.callback()
            closeMenu()
          }}
        >
          {menuAction.label}
        </MenuItem>
      )
    })
  }

  return (
    <React.Fragment>
      <IconButton
        color='secondary'
        onClick={openMenu}
      >
        <MoreVert />
      </IconButton>
      <Menu { ...menuProps }>
        {renderMenuItems()}
      </Menu>
    </React.Fragment>
  )
}

export default BaseMenu
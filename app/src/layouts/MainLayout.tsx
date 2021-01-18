import React from 'react'
import { Hidden, Drawer, Divider } from '@material-ui/core'
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { MusicNote, Album, PlaylistPlay } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

/* CSS */
const drawerWidth = 200
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: drawerWidth,
    },
    // if screenwidth > sm (i.e. drawer shown), add left margin
    content: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerWidth
      },
      height: '100vh'
    }
  })
)

/* JSX */
interface Entry {
  label: string
  icon: MUISvgIcon
  component?: string
  routePath: string
}
const items: Array<Entry> = [
  {
    label: 'Player',
    icon: MusicNote,
    routePath: '/player'
  },
  {
    label: 'Library',
    icon: Album,
    routePath: '/library'
  },
  {
    label: 'Playlist',
    icon: PlaylistPlay,
    routePath: '/playlist'
  }
]

interface MainDrawerProps {
  entries: Array<Entry>
}
function MainDrawer (props: MainDrawerProps) {
  const classes = useStyles()
  return (
    <Hidden xsDown implementation="js">
      <Drawer
        variant="permanent"
        anchor="left"
        open
      >
        <Divider />
          <List className={classes.list}>
            {props.entries.map((entry, index) => 
              <ListItem key={index} button component={Link} to={entry.routePath}>
                <ListItemIcon><entry.icon /></ListItemIcon>
                <ListItemText>{entry.label}</ListItemText>
              </ListItem>
            )}
          </List>
      </Drawer>
    </Hidden>
  )
}

interface MainLayoutProps {
  children: React.ReactNode
}
export default function MainLayout (props: MainLayoutProps) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <MainDrawer entries={items} />
      <div className={classes.content}>
        {props.children}
      </div>
    </React.Fragment>
  )
}

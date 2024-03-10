import { useLongPress } from '~/lib/longPress';
import { Toolbar, IconButton, Typography, Drawer } from '@mui/material';
import { useFullscreen } from 'fullscreen-slice';

export default function Menu({ drawers = [], actions, titre }) {
  const hideDrawer = (onToggle) => onToggle && onToggle(false);
  const showDrawer = (onToggle) => onToggle && onToggle(true);
  const { useIsFullscreen } = useFullscreen();
  const isFullscreen = useIsFullscreen();

  return (
    <Toolbar color='transparent'>
      {/*
          <IconIconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon
          </IconIconButton>
          */}
      {drawers.map(
        ({ disabled, title, description, id, onToggle }) =>
          !disabled &&
          description && (
            <IconButton
              key={id}
              onClick={() => showDrawer(onToggle)}
              color='inherit'
              title={title}
            >
              {description}
            </IconButton>
          ),
      )}

      <Typography variant='h2'>{titre || ''}</Typography>

      {actions
        .filter((action) => !action.disabled)
        .map((action) => (
          <MenuItem
            key={action.cmd}
            {...{ action }}
          />
        ))}

      {drawers.map(
        ({ disabled, id, visible, content, onToggle }) =>
          !disabled && (
            <Drawer
              key={id}
              anchor='left'
              open={visible}
              onClose={() => hideDrawer(onToggle)}
              container={isFullscreen ? document.getElementById('fullscreen-app') : null}
            >
              {content}
            </Drawer>
          ),
      )}
    </Toolbar>
  );
}

const MenuItem = ({ action }) => {
  const { cmd, long, title, description } = action;
  const mouseEvents = useLongPress({
    onClick: cmd,
    onLongPress: long,
    ms: 1500,
  });
  return (
    <IconButton
      {...mouseEvents}
      color='inherit'
      title={title}
    >
      {description}
    </IconButton>
  );
};

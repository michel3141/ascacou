import React from 'react';
import { useLongPress } from '/lib/longPress';
import { Toolbar, IconButton, Typography, Drawer } from '@mui/material';

export default function Menu({ drawers = [], actions, titre }) {
  const hideDrawer = (d) => d.onToggle && d.onToggle(false);
  const showDrawer = (d) => d.onToggle && d.onToggle(true);

  actions.forEach(
    (action) =>
      (action.mouseEvents = useLongPress({
        onClick: action.cmd,
        onLongPress: action.long,
        ms: 1500,
      }))
  );

  return (
    <Toolbar color='transparent'>
      {/*
          <IconIconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon
          </IconIconButton>
          */}
      {actions.map(
        (a) =>
          !a.disabled && (
            <IconButton
              {...a.mouseEvents}
              key={a.cmd}
              color='inherit'
              title={a.title}
            >
              {a.lbl}
            </IconButton>
          )
      )}
      <Typography variant='h2'>{titre || ''}</Typography>

      {drawers.map(
        (d, i) =>
          !d.disabled &&
          d.lbl && (
            <IconButton
              key={i}
              style={i === 0 ? { marginLeft: 'auto' } : {}}
              onClick={() => showDrawer(d)}
              color='inherit'
              title={d.title}
            >
              {d.lbl}
            </IconButton>
          )
      )}

      {drawers.map(
        (d, i) =>
          !d.disabled && (
            <Drawer
              key={i}
              anchor='right'
              open={d.visible}
              onClose={() => hideDrawer(d)}
            >
              {d.action}
            </Drawer>
          )
      )}
    </Toolbar>
  );
}

import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Menu({ drawers = [], left, right, titre }) {
  return (
    <AppBar
      position='static'
      color='transparent'
      className='Appbar'
    >
      <Toolbar color='transparent'>
        {left}
        <Typography variant='h2'>{titre || ''}</Typography>
        {right}
        {drawers}
      </Toolbar>
    </AppBar>
  );
}

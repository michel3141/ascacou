import React from 'react';
import { Grid } from '@mui/material';
import Selector from '~/containers/Selector';
import Score from './Score';
import Board from '~/containers/Board';
import Hand from '~/containers/Hand';

const aspectThreshold = 0.67;

const Layout = ({ LEFT, RIGHT, aspect }) => {
  const { style } = window.document.documentElement; // html
  if (aspect > aspectThreshold && aspect < 1.15) {
    style.setProperty('--ascacou-scale', aspectThreshold / aspect);
  } else {
    style.setProperty('--ascacou-scale', 1);
  }
  return (
    <Grid
      container
      spacing={0}
      textAlign='center'
      alignItems='center'
    >
      <Grid
        item
        xs={12}
      >
        <Hand pos={LEFT} />
      </Grid>
      <Grid
        item
        xs={8}
      >
        <Board />
      </Grid>
      <Grid
        item
        xs={4}
      >
        <Selector />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Score {...{ LEFT, RIGHT }} />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Hand pos={RIGHT} />
      </Grid>
    </Grid>
  );
};

export default Layout;

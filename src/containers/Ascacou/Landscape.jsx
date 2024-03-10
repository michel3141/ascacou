import React from 'react';
import { Grid } from '@mui/material';
import Score from './Score';
import Board from '~/containers/Board';
import Hand from '~/containers/Hand';

const aspectThreshold = 2.41;
const xs = [4, 4, 4];

const Layout = ({ LEFT, RIGHT, aspect }) => {
  const { style } = window.document.documentElement; // html
  if (aspect > aspectThreshold) {
    style.setProperty('--ascacou-scale', aspectThreshold / aspect);
  } else {
    style.setProperty('--ascacou-scale', 1);
  }
  return (
    <Grid
      container
      direction='row'
      justify='space-evenly'
      alignItems='flex-start'
    >
      <Grid
        item
        xs={xs[0]}
      >
        <Hand pos={LEFT} />
      </Grid>
      <Grid
        item
        xs={xs[1]}
      >
        <Grid
          container
          direction='column'
          alignItems='center'
          justify='space-evenly'
        >
          <Grid item>
            <Board />
          </Grid>
          <Grid item>
            <Score {...{ LEFT, RIGHT }} />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={xs[2]}
      >
        <Hand pos={RIGHT} />
      </Grid>
    </Grid>
  );
};
export default Layout;

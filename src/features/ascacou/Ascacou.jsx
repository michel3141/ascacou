import React from 'react';

import { FIRST, SECOND } from '/app/constants/players';

import { Grid } from '@mui/material';

import Board from '/features/board/Board';
import { useBoardSlice } from '/app/slices';

import Player from '/features/players/Player';
import Selector from '/features/selector/Selector';
import './Ascacou.css';

const md = [4, 4, 4]

const Ascacou = () => {
  return (
    <div className='Ascacou'>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='flex-start'
      >

        <Grid
          item
          xs={3}
	  md={md[0]}
        >
          <Player id={FIRST} />
        </Grid>
        <Grid
          item
	  xs={6}
	  md={md[1]}
        >
          <Grid
            container
            direction='column'
            alignItems='center'
            justify='space-evenly'
          >
            <Grid
              item
            >
              <Board />
            </Grid>
            <Grid
              item
            >
              <Selector />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={3}
	  md={md[2]}
        >
          <Player id={SECOND} />
        </Grid>
      </Grid>
      <Fen />
    </div>
  );
};

const Fen = () => {
  const fen = useBoardSlice().useFen();
  return <div className='Fen'>{fen}</div>;
};
export default Ascacou;

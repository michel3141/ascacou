import React, { Suspense, lazy } from 'react';
import './Ascacou.scss';

import { Grid } from '@mui/material';

import { FIRST, SECOND } from '/app/constants/players';
import { useBoardSlice } from '/app/slices';

const Board = lazy(() => import('/features/board/Board'));
const Player = lazy(() => import('/features/players/Player'));

const md = [4, 4, 4];

const Ascacou = () => {
  return (
    <div className='Ascacou'>
      <Suspense fallback={'...'}>
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
              <Grid item>
                <Board />
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
      </Suspense>
    </div>
  );
};

const Fen = () => {
  const fen = useBoardSlice().useFen();
  return <div className='Fen'>{fen}</div>;
};
export default Ascacou;

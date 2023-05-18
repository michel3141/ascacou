import React, { Suspense, lazy } from 'react';
import './Ascacou.scss';

import { Grid, Button } from '@mui/material';

import { NOBODY, FIRST, SECOND } from '/app/constants/players';
import { useBoardSlice, usePlayersSlice, useCardsSlice, useAppSlice } from '/app/slices';

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
              <Grid item>
                <Score />
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

const Score = () => {
  const { useScore } = useCardsSlice();
  const { useCurrent } = usePlayersSlice();
  const { toggleShowConfig } = useAppSlice();
  const score = useScore();
  const playerId = useCurrent();

  return (
    <div className='Score'>
      <h2>
        {score[FIRST]} à {score[SECOND]}
      </h2>
      {playerId === NOBODY && (
        <Button
          variant='contained'
          onClick={toggleShowConfig}
        >
          Nouvelle partie
        </Button>
      )}
    </div>
  );
};
export default Ascacou;

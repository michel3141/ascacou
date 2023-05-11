import React from 'react';
import { Grid } from '@mui/material';
import Board from '/features/board/Board';
import Cards from '/features/cards/Cards';
import './Victoire.css';
import { useCardsSlice, usePlayersSlice } from '/app/slices';
import { FIRST, SECOND } from '/app/constants/players';

export default function Victoire() {
  const { useScore } = useCardsSlice();
  const { usePlayerById } = usePlayersSlice();
  const score = useScore();
  const winnerId = score[FIRST] >= score[SECOND] ? FIRST : SECOND;
  const looserId = score[FIRST] > score[SECOND] ? SECOND : FIRST;
  const winner = usePlayerById(winnerId);

  return (
    <div className='Victoire'>
      <Grid
        container
        direction='column'
        justify='space-evenly'
        alignItems='center'
      >
        <Grid
          item
          xs
        >
          {winnerId === looserId ? <Drawn /> : <Winner {...winner} />}
        </Grid>
        <Grid
          item
          xs
        >
          <Board />
        </Grid>
        <Grid
          item
          xs
        >
          <Score {...{ score, winnerId, looserId }} />
        </Grid>
      </Grid>
    </div>
  );
}

const Drawn = () => <h1>Égalité !</h1>;

const Winner = ({ name }) => <h1>Victoire de {name}</h1>;

const Score = ({ score, winnerId, looserId }) => {
  const { useCardsByPlayerId } = useCardsSlice();
  const winnerCards = useCardsByPlayerId(winnerId);
  const looserCards = useCardsByPlayerId(looserId);
  return (
    <div className='Score'>
      <h2>
        {score[winnerId]} à {score[looserId]}
      </h2>
      <table>
        <tbody>
          <tr>
            <td align='center'>
              <Cards
                cards={winnerCards}
                done
              />
            </td>
            <td align='center'>
              <Cards
                cards={looserCards}
                done
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

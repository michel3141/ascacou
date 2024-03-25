/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Grid } from '@mui/material';
import Board from '~/containers/Board';
import Cards from '~/containers/Cards';
import './Victoire.scss';
import { Revenge } from '~/containers/Ascacou/Buttons';
import { useGame } from '~/features/game';
import { usePlayers } from '~/features/players';
import { FIRST, SECOND } from '~/features/players/constants';
import { useUser } from '~/features/user';

export default function Victoire() {
  const { useScore } = useGame();
  const { usePlayerByPos } = usePlayers();
  const score = useScore();
  const winnerPos = score[FIRST] >= score[SECOND] ? FIRST : SECOND;
  const looserPos = score[FIRST] > score[SECOND] ? SECOND : FIRST;
  const winner = usePlayerByPos(winnerPos);

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
          {winnerPos === looserPos ? <Drawn /> : <Winner {...winner} />}
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
          <Score {...{ score, winnerPos, looserPos }} />
        </Grid>
        <Grid
          item
          xs
        >
          &nbsp;
        </Grid>
        <Grid
          item
          xs
        >
          <Revenge />
        </Grid>
      </Grid>
    </div>
  );
}

const Drawn = () => <h1>Égalité !</h1>;

const Winner = ({ id, name }) => {
  const user = useUser().useUser();
  return id === user.id ? (
    <h1>Bravo ! {name || 'Anonyme'}</h1>
  ) : (
    <h1>Victoire de votre adversaire : {name || 'Anonyme'}</h1>
  );
};

const Score = ({ score, winnerPos, looserPos }) => {
  const { useCardsByPlayerPos } = useGame();
  const winnerCards = useCardsByPlayerPos(winnerPos);
  const looserCards = useCardsByPlayerPos(looserPos);
  return (
    <div className='Score'>
      <h2>
        {score[winnerPos]} à {score[looserPos]}
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

import { Grid, Button } from '@mui/material';
import Board from '~/containers/Board';
import Cards from '~/containers/Cards';
import './Victoire.scss';
import { useUi } from '~/features/ui';
import { useGame } from '~/features/game';
import { usePlayers } from '~/features/players';
import { FIRST, SECOND } from '~/features/players/constants';
import { useUser } from '~/features/user';

export default function Victoire() {
  const { useScore } = useGame();
  const { usePlayerByPos } = usePlayers();
  const { toggleShowConfig } = useUi();
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
          <Button
            variant='contained'
            onClick={() => toggleShowConfig()}
          >
            Nouvelle partie
          </Button>
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

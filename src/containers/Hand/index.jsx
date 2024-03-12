import './Hand.scss';
import { Button } from '@mui/material';
import mkClasses from '~/lib/mkClasses';
import { useGame } from '~/features/game';
import { useUser } from '~/features/user';
import { usePlayers } from '~/features/players';
import Cards from '~/containers/Cards';
import Selector from '~/containers/Selector';
import { useViewport } from 'viewport-slice';

export default function Hand({ pos }) {
  const { useCardsByPlayerPos, useCurrentPlayerPos } = useGame();
  const { useOrientation } = useViewport();

  const cards = useCardsByPlayerPos(pos);
  const orientation = useOrientation();

  const monTour = pos === useCurrentPlayerPos();
  const className = mkClasses(pos, {
    'mon-tour': monTour,
    'pas-mon-tour': !monTour,
  });
  return (
    <div className='Hand'>
      <fieldset {...{ className }}>
        <legend>
          <Name {...{ pos }} />
        </legend>
        <Cards
          {...{ cards }}
          mixed
        />
        <SwapCards {...{ monTour }} />
        {orientation === 'landscape' && <Selector />}
      </fieldset>
    </div>
  );
}

const Name = ({ pos }) => {
  const { usePlayerByPos } = usePlayers();

  const player = usePlayerByPos(pos);

  return <>{player?.name || 'Anonyme'}</>;
};

const SwapCards = ({ monTour }) => {
  const { useIsFirstTurn, swapCards } = useGame();
  const isFirstTurn = useIsFirstTurn();
  const { useIsMyTurn } = useUser();
  const isMyTurn = useIsMyTurn();
  if (!monTour || !isMyTurn || !isFirstTurn) {
    return null;
  }
  return (
    null && (
      <div>
        <Button
          variant='outlined'
          onClick={swapCards}
        >
          Échanger
        </Button>
      </div>
    )
  );
};

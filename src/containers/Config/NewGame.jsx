import { ResetGame, Revenge } from '~/containers/Ascacou/Buttons';
import { useGame } from '~/features/game';

import { Divider } from './Common';

const NewGame = () => {
  const { useIsRunning, useIsFirstTurn } = useGame();
  const isFirstTurn = useIsFirstTurn();
  const isRunning = useIsRunning();

  if (isFirstTurn) {
    return null;
  }
  return (
    <>
      {isRunning ? <ResetGame /> : <Revenge />}
      <Divider />
    </>
  );
};

export default NewGame;

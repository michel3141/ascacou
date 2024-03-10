import { Button } from '@mui/material';
import { useUi } from '~/features/ui';
import { useGame } from '~/features/game';

const Score = ({ LEFT, RIGHT }) => {
  const { useScore, useIsRunning } = useGame();
  const { toggleShowConfig } = useUi();
  const score = useScore();
  const isRunning = useIsRunning();

  return (
    <div className='Score'>
      <h2>
        {score[LEFT]} à {score[RIGHT]}
      </h2>
      {!isRunning && (
        <Button
          variant='contained'
          onClick={() => toggleShowConfig()}
        >
          Nouvelle partie
        </Button>
      )}
    </div>
  );
};

export default Score;

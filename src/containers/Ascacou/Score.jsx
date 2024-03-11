import { Revenge, LaisserLaMain } from '~/containers/Ascacou/Buttons';
import { useGame } from '~/features/game';

const Score = ({ LEFT, RIGHT }) => {
  const { useScore, useIsRunning } = useGame();
  const score = useScore();
  const isRunning = useIsRunning();

  return (
    <div className='Score'>
      <h2>
        {score[LEFT]} à {score[RIGHT]}
      </h2>
      <LaisserLaMain />
      {!isRunning && <Revenge />}
    </div>
  );
};

export default Score;

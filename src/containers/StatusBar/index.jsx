import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import './StatusBar.scss';
import Share from '~/containers/Ascacou/Share';
import { useGame } from '~/features/game';
import { useUser } from '~/features/user';

const StatusBar = () => {
  return (
    <div className='StatusBar'>
      <CurrentTable />
    </div>
  );
};

const CurrentTable = () => {
  const { useId } = useGame();
  const gameId = useId();
  const opponent = useUser().useOpponent();
  if (!gameId) {
    return null;
  }
  return (
    <>
      <div className='Partie'>
        {opponent.id ? `partie contre ${opponent.name}` : <Share prefix='Ma table: ' />}
      </div>
      <Separator />
      <Undo />
    </>
  );
};

const Separator = () => <div className='Separator' />;

const Undo = () => {
  const { useIsMyTurn } = useUser();
  const { undo, useCanUndo } = useGame();
  const isMyTurn = useIsMyTurn();
  const canUndo = useCanUndo();
  return (
    isMyTurn &&
    canUndo && (
      <IconButton
        onClick={undo}
        color='inherit'
        title='Annuler le coup'
        size='small'
      >
        <ReplayIcon />
      </IconButton>
    )
  );
};

export default StatusBar;

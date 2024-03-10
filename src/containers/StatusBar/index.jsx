import React from 'react';
import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import './StatusBar.scss';
import Share from '~/containers/Ascacou/Share';
import { useGame } from '~/features/game';
import { usePlayers } from '~/features/players';
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
      {opponent.id ? (
        <div className='Partie'>partie contre {opponent.name}</div>
      ) : (
        <Share prefix='Ma table: ' />
      )}
      <Separator />
      <Undo />
      <LaisseLaMain />
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

const LaisseLaMain = () => {
  const { useIsFirstTurn } = useGame();
  const isFirstTurn = useIsFirstTurn();
  const { useIsMyTurn } = useUser();
  const isMyTurn = useIsMyTurn();
  const { swap } = usePlayers();
  return (
    isMyTurn &&
    isFirstTurn && (
      <IconButton
        onClick={swap}
        color='inherit'
        title='Laisser la main'
        size='small'
      >
        <AutorenewIcon />
      </IconButton>
    )
  );
};
export default StatusBar;

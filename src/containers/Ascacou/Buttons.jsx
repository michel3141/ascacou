import { useState } from 'react';
import { Button } from '@mui/material';

import { useGame } from '~/features/game';
import { useUi } from '~/features/ui';
import { useUser } from '~/features/user';

export const LaisserLaMain = () => {
  const { useIsFirstTurn, swapPlayers } = useGame();
  const isFirstTurn = useIsFirstTurn();
  const { useIsMyTurn } = useUser();
  const isMyTurn = useIsMyTurn();
  return (
    isFirstTurn &&
    isMyTurn && (
      <MyButton
        noConfirmation={true}
        label='Laisser la main'
        action={swapPlayers}
      />
    )
  );
};

export const ResetGame = () => {
  const { reset } = useGame();
  return (
    <MyButton
      label='Recommencer'
      action={reset}
    />
  );
};

export const Revenge = () => {
  const { reset, revenge } = useGame();
  const { closeDrawers, toggleShowConfig } = useUi();
  return (
    <>
      <MyButton
        noConfirmation={true}
        label='Revanche'
        action={() => {
          closeDrawers();
          revenge();
        }}
      />
      <MyButton
        noConfirmation={true}
        variant='outlined'
        label='Autre partie'
        action={() => {
          toggleShowConfig(true);
          reset();
        }}
      />
    </>
  );
};

export const MyButton = ({ action, label, noConfirmation, variant = 'contained', ...others }) => {
  const [request, setRequest] = useState(noConfirmation);
  variant = request ? variant : 'outlined';
  return (
    <Button
      variant={variant}
      color={variant === 'contained' ? 'primary' : 'secondary'}
      onClick={() => (request ? action() : setRequest(true))}
      {...others}
    >
      {request && !noConfirmation ? 'Confirmez' : label}
    </Button>
  );
};

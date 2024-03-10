import React, { useState } from 'react';
import { Button } from '@mui/material';

import { useGame } from '~/features/game';
import { usePlayers } from '~/features/players';
import { useUi } from '~/features/ui';

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

const ResetGame = () => {
  const { reset } = useGame();
  return (
    <MyButton
      label='Recommencer'
      action={reset}
    />
  );
};

const Revenge = () => {
  const { reset, swapCards } = useGame();
  const { swap } = usePlayers();
  const { toggleShowConfig } = useUi();
  return (
    <>
      <MyButton
        noConfirmation={true}
        variant='outlined'
        label='Recommencer'
        action={reset}
      />
      <MyButton
        noConfirmation={true}
        label='Revanche'
        action={async () => {
          toggleShowConfig(false);
          await swap();
          await swapCards();
          await reset();
        }}
      />
    </>
  );
};

const MyButton = ({ action, label, noConfirmation, variant = 'contained' }) => {
  const [request, setRequest] = useState(noConfirmation);
  return (
    <Button
      variant={request ? variant : 'outlined'}
      color='primary'
      onClick={() => (request ? action() : setRequest(true))}
    >
      {request && !noConfirmation ? 'Confirmez' : label}
    </Button>
  );
};
export default NewGame;
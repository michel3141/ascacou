import { useState } from 'react';
import { Button } from '@mui/material';

import { useGame } from '~/features/game';
import { useUi } from '~/features/ui';

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
  return (
    <Button
      variant={request ? variant : 'outlined'}
      color='primary'
      onClick={() => (request ? action() : setRequest(true))}
      {...others}
    >
      {request && !noConfirmation ? 'Confirmez' : label}
    </Button>
  );
};

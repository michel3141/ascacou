import { useState } from 'react';
import { Button } from '@mui/material';

import { useGame } from '~/features/game';
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
  const { reset, revenge } = useGame();
  const { toggleShowConfig } = useUi();
  return (
    <>
      <MyButton
        noConfirmation={true}
        variant='outlined'
        label='Recommencer'
        action={reset}
      />
      <div title='En cours de développement'>
        <MyButton
          noConfirmation={true}
          label='Revanche'
          action={async () => {
            toggleShowConfig(false);
            revenge();
          }}
        />
      </div>
    </>
  );
};

const MyButton = ({ action, label, noConfirmation, variant = 'contained', ...others }) => {
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
export default NewGame;

import { Typography } from '@mui/material';
import { useGame } from '~/features/game';
import { useApp } from '~/features/app';

import './Config.scss';
import { Divider, Param } from './Common';

const Config = () => {
  return (
    <>
      <Title />
      <Params />
      <Divider />
    </>
  );
};

const Title = () => {
  const { useIsFirstTurn } = useGame();
  const isFirstTurn = useIsFirstTurn();
  return (
    <Typography variant='h4'>{isFirstTurn ? 'Nouvelle partie' : 'Partie en cours'}</Typography>
  );
};

const Params = () => {
  const { updateParam, useConfig } = useApp();
  const params = useConfig();
  return (
    <>
      {params.map((param) => (
        <Param
          key={param.name}
          {...{ param, updateParam }}
        />
      ))}
    </>
  );
};

export { Params };
export default Config;

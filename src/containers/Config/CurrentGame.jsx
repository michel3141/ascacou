/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 * 
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 * 
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 * 
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Typography } from '@mui/material';
import { LaisserLaMain } from '~/containers/Ascacou/Buttons';
import { useGame } from '~/features/game';
import { useApp } from '~/features/app';

import './Config.scss';
import { Divider, Param } from './Common';

const Config = () => {
  return (
    <>
      <Title />
      <Params />
      <LaisserLaMain />
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

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

export const MyButton = ({
  action,
  label,
  noConfirmation,
  variant = 'contained',
  ...others
}) => {
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

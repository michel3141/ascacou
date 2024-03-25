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
        {opponent.id ? (
          `partie contre ${opponent.name}`
        ) : (
          <Share prefix='Ma table: ' />
        )}
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

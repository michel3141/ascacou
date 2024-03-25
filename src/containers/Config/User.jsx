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

import { useEffect, useState, useRef } from 'react';
import Share from '~/containers/Ascacou/Share';
import { TextField, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Divider } from './Common';
import { useUi } from '~/features/ui';
import { useUser } from '~/features/user';
import { useGame } from '~/features/game';

const User = () => {
  const user = useUser().useUser();
  return (
    !!user?.id && (
      <>
        <UserName {...{ user }} />
        <LeaveTable />
        <Divider />
      </>
    )
  );
};

const UserName = ({ user }) => {
  const { toggleShowConfig } = useUi();
  const { update } = useUser();

  const { id } = user;
  const [name, setName] = useState(user.name);
  const delayedName = useRef(name);

  useEffect(() => {
    if (delayedName.current !== name) {
      const timer = setTimeout(() => {
        update({ id, name }).then(() => (delayedName.current = name));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [id, name, update]);
  return (
    <TextField
      label='Utilisateur'
      value={name}
      onChange={(e) => {
        setName(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          update({ ...user, name });
          toggleShowConfig(false);
        }
      }}
    />
  );
};

const LeaveTable = () => {
  const { leave } = useUser();
  const { useId } = useGame();
  const gameId = useId();
  if (!gameId) {
    return null;
  }
  return (
    <>
      <p>
        <Share />
      </p>
      <p>
        Quitter la table de jeu
        <IconButton
          onClick={leave}
          color='inherit'
          title='Quitter la table de jeu'
        >
          <Logout />
        </IconButton>
      </p>
    </>
  );
};

export { UserName };
export default User;

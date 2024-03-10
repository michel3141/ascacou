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

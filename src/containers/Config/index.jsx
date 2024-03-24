import icon from '~assets/img/icon_128.png';

import './Config.scss';
import User from './User';
import CurrentGame from './CurrentGame';
import NewGame from './NewGame';
import Close from './Close';
import { Divider } from './Common';

import { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import { decode } from '~/app/aaa';
import { useApp } from '~/features/app';
import { useGame } from '~/features/game';

export default function CurrentGamePanel() {
  const { useId } = useGame();
  const gameId = useId();
  return (
    <div className='Config'>
      <Grid
        container
        direction='column'
        justify='space-evenly'
        alignItems='center'
      >
        <Icon />
        <User />
        {gameId ? (
          <>
            <CurrentGame />
            <NewGame />
            <Close />
          </>
        ) : (
          <>
            <Welcome />
            <Divider />
            <p style={{ textAlign: 'center' }}>
              Jeu créé par Marc Buonomo
              <br />
              marcbuonomo26@gmail.com
            </p>
            <p style={{ textAlign: 'center' }}>
              App en ligne par <a href='https://github.com/michel3141'>MicheL</a>
            </p>
          </>
        )}
      </Grid>
    </div>
  );
}

const Icon = () => (
  <>
    <p style={{ textAlign: 'center' }}>
      <img src={icon} />
    </p>
    <Divider />
  </>
);

function Welcome() {
  const { useId } = useGame();
  const gameId = useId();
  if (gameId) {
    return null;
  }
  return (
    <div className='Welcome'>
      <p>Pour commencer à jouer, vous pouvez</p>
      <ul>
        <li>Soit créer une nouvelle table de jeu</li>
        <CreateTable />
        <li>Soit rejoindre la table de jeu où votre adversaire vous attend</li>
        <JoinTable />
      </ul>
    </div>
  );
}

const JoinTable = () => {
  const [gameName, setGameName] = useState('');
  const [gameId, setGameId] = useState(null);
  useEffect(() => {
    try {
      const gameId = decode(gameName) + '';
      setGameId(gameId);
    } catch {
      setGameId(null);
    }
  }, [gameName, setGameId]);

  const { loadGame } = useApp();
  const login = (options = {}) => {
    const id = options.numeric ? gameName : gameId;
    loadGame(id);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <TextField
          style={{ marginTop: 10 }}
          label='Nom de la table de jeu'
          placeholder='Nom de la table'
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (e.shiftKey) {
                login({ numeric: true });
              } else {
                login();
              }
            }
          }}
        />
      </div>
      <div>
        <Button
          onClick={login}
          variant='contained'
          title='Rejoindre la table'
          disabled={!gameId}
        >
          Rejoindre
        </Button>
      </div>
    </div>
  );
};

const CreateTable = () => {
  const { startGame } = useApp();
  return (
    <div style={{ textAlign: 'center' }}>
      <Button
        onClick={() => startGame()}
        variant='contained'
        title='Créer une nouvelle table'
      >
        Nouvelle table de jeu
      </Button>
    </div>
  );
};

import icon from '~assets/img/icon_128.png';

import './Config.scss';
import User from './User';
import CurrentGame from './CurrentGame';
import NewGame from './NewGame';
import Close from './Close';

import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import { decode } from '~/app/aaa';
import { useApp } from '~/features/app';
import { useGame } from '~/features/game';

export default function CurrentGamePanel () {
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
          <Welcome />
        )}
      </Grid>
    </div>
  );
}

const Icon = () => (
  <p style={{ textAlign: 'center' }}>
    <img src={icon} />
  </p>
);

function Welcome () {
  const { useId } = useGame();
  const gameId = useId();
  if (gameId) {
    return null;
  }
  return (
    <div className='Welcome'>
      <p>Pour commencer à jouer, vous pouvez</p>
      <ul>
        <li>Soit rejoindre la table de jeu où votre adversaire vous attend</li>
        <JoinTable />
        <li>Soit créer une nouvelle table de jeu</li>
        <CreateTable />
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
      <Button
        onClick={login}
        variant='contained'
        title='Rejoindre la table'
        disabled={!gameId}
      >
        Rejoindre
      </Button>
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

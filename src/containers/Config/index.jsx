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

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

import { useState, useEffect, useRef } from 'react';

import './Ascacou.scss';
import { useViewport } from 'viewport-slice';

import { FIRST, SECOND } from '~/features/players/constants';
import { useGame } from '~/features/game';
import { usePlayers } from '~/features/players';
import { useUser } from '~/features/user';

import { Landscape, Portrait } from './Layouts';

const Ascacou = () => {
  const { useId } = useGame();
  const gameId = useId();
  return gameId ? <Game /> : null;
};

const Game = () => {
  const { useId } = useUser();
  const userId = useId();
  const firstPlayer = usePlayers().usePlayerByPos(FIRST);
  const LEFT = firstPlayer.id === userId ? FIRST : SECOND;
  const RIGHT = firstPlayer.id !== userId ? FIRST : SECOND;
  const { useAspect } = useViewport();
  const windowAspect = useAspect();
  const ref = useRef(null);
  const [aspect, setAspect] = useState(null);
  useEffect(() => {
    const { offsetHeight, offsetWidth } = ref.current;
    setAspect(offsetWidth / offsetHeight);
  }, [ref, windowAspect]);
  const className = aspect > 1.23 ? 'Landscape' : 'Portrait';
  return (
    <div
      id='Ascacou'
      {...{ className }}
      {...{ ref }}
    >
      {aspect > 1.23 ? (
        <Landscape {...{ LEFT, RIGHT, aspect }} />
      ) : (
        <Portrait {...{ LEFT, RIGHT, aspect }} />
      )}
      <Fen />
    </div>
  );
};

const Fen = () => {
  const fen = useGame().useFen();
  return <div className='Fen'>{fen}</div>;
};

export default Ascacou;

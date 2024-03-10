import React, { useState, useEffect, useRef } from 'react';

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
  return (
    <div
      id='Ascacou'
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

import React from 'react';
import './Player.scss';
import mkClasses from '/lib/mkClasses';
import { usePlayersSlice, useCardsSlice } from '/app/slices';
import Cards from '/features/cards/Cards';
import Selector from '/features/selector/Selector';

export default function Player({ id }) {
  const { useCurrent, usePlayerById } = usePlayersSlice();
  const { useCardsByPlayerId } = useCardsSlice();

  const player = usePlayerById(id);

  const { name } = player;
  const cards = useCardsByPlayerId(id);

  const monTour = id === useCurrent();
  const className = mkClasses({
    'mon-tour': monTour,
    'pas-mon-tour': !monTour,
  });
  return (
    <div className='Player'>
      <fieldset {...{ className }}>
        <legend>{monTour ? `${name}` : `[${name}]`}</legend>
        <Cards {...{ cards }} />
        {monTour && <Selector />}
      </fieldset>
      <fieldset>
        <Cards
          {...{ cards }}
          done
        />
      </fieldset>
    </div>
  );
}

import React from 'react';
import Card from '/features/cards/Card';

const Cards = ({ cards, done = false }) =>
  cards
    .filter((card) => done === card.active)
    .map((card) => (
      <Card
        key={card.id}
        {...card}
      />
    ));

export default Cards;

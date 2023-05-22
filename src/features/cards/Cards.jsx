import React, { Suspense, lazy } from 'react';
const Card = lazy(() => import('/features/cards/Card'));

const Cards = ({ cards, done = false }) => (
  <Suspense fallback={'...'}>
    {cards
      .filter((card) => done === card.active)
      .map((card) => (
        <Card
          key={card.id}
          {...card}
        />
      ))}
  </Suspense>
);

export default Cards;

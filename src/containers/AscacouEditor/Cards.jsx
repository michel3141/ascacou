import { Suspense, lazy } from 'react';
const Card = lazy(() => import('./Card'));

const Cards = ({ cards }) => {
  const cardList = (cards || '')
    .replaceAll(' ', '')
    .replaceAll('/', '')
    .split('')
    .map((v) => {
      try {
        return parseInt(v, 16);
      } catch {
        return null;
      }
    })
    .filter((v) => v !== null);
  return (
    <Suspense fallback={'...'}>
      {cardList.map((value, i) => (
        <Card
          key={i}
          {...{ value }}
        />
      ))}
    </Suspense>
  );
};

export default Cards;

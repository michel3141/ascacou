import Card from './Card';

const Cards = ({ cards, done = false, mixed = false }) =>
  cards.map((card) => (
    <Card
      key={card.id || card.value}
      {...{ card, done, mixed }}
    />
  ));

export default Cards;

import './Card.scss';
import mkClasses from '~/lib/mkClasses';

export default function Card({ card, done, mixed }) {
  if (mixed) {
    done = card.active;
  }
  if (card.active === done) {
    const className = mkClasses('Card', `m-${card.value}`, { done });
    return <div {...{ className }} />;
  } else {
    return null;
  }
}

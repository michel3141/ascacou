import { useState } from 'react';
import '../Cards/Card.scss';
import mkClasses from '~/lib/mkClasses';

export default function Card({ value }) {
  const [done, setDone] = useState(false);
  const className = mkClasses('Card', `m-${value}`, { done });
  return (
    <div
      {...{ className }}
      onClick={() => setDone((p) => !p)}
    />
  );
}

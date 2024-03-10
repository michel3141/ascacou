import React from 'react';
import './Card.scss';
import mkClasses from '/lib/mkClasses';

export default function Card({ id, active }) {
  const className = mkClasses('Card', `m-${id}`, { done: active });
  return <div {...{ className }} />;
}

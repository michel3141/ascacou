import React from 'react'
import '/css/Player.css'
import mkClasses from '/lib/mkClasses'
import Card from './Card'
import { usePlayersSlice } from '/app/slices'

export default function Player({ id, name, cards }) {
  const { useCurrent } = usePlayersSlice()
  const player = useCurrent()
  console.log(player)
  const myCards = cards.filter(c => c.player === id)
  const className = mkClasses({
    'mon-tour': player === id,
    'pas-mon-tour': player !== id,
  })
  return (
    <div className='Player'>
      <fieldset {...{ className }}>
        <legend>[{name}]</legend>
        <Cards cards={myCards} />
      </fieldset>
      <fieldset>
        <Cards
          cards={myCards}
          done
        />
      </fieldset>
    </div>
  )
}

const Cards = ({ cards, done = false }) =>
  cards
    .filter(card => done === card.done)
    .map(card => (
      <Card
        key={card.value}
        {...card}
      />
    ))

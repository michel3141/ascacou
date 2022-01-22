import '/css/Player.css'
import Card from './Card'
import React from 'react'

export default function ({ id, name, player, cards }) {
  const mon_tour = player == id
  return (
    <div className='Player'>
      <fieldset className={mon_tour ? 'mon-tour' : 'pas-mon-tour'}>
        <legend>[{name}]</legend>
        {cards
          .filter(c => c.player == id && !c.done)
          .map(c => (
            <Card key={c.value} card={c} />
          ))}
      </fieldset>
      <fieldset>
        {cards
          .filter(c => c.player == id && c.done)
          .map(c => (
            <Card key={c.value} card={c} />
          ))}
      </fieldset>
    </div>
  )
}

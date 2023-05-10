import React from 'react'
import '/css/Player.css'
import mkClasses from '/lib/mkClasses'
import Card from '/features/cards/Card'
import { usePlayersSlice, useCardsSlice } from '/app/slices'

export default function Player({ id }) {
  const { useCurrent, useList, usePlayerById } = usePlayersSlice()
  const { useCardsByPlayerId } = useCardsSlice()

  const player = usePlayerById(id)

  const cards = []
  const { name } = player
  const myCards = useCardsByPlayerId(id)

  const monTour = id === useCurrent()
  const className = mkClasses({
    'mon-tour': monTour,
    'pas-mon-tour': !monTour,
  })
  return (
    <div className='Player'>
      <fieldset {...{ className }}>
        <legend>{monTour ? `${name}` : `[${name}]`}</legend>
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
    .filter(card => done === card.active)
    .map(card => (
      <Card
        key={card.id}
        {...card}
      />
    ))

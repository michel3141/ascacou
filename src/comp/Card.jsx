import React from 'react'
import '/css/Card.css'

export default function ({ card }) {
  let className = 'Card'
  className += ' m-' + card.value
  if (card.done) className += ' done'
  return <div className={className} />
}

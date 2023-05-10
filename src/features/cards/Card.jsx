import React from 'react'
import './Card.css'
import mkClasses from '/lib/mkClasses'

export default function Card({ id, active }) {
  const className = mkClasses('Card', `m-${id}`, { done: active })
  return <div {...{ className }} />
}

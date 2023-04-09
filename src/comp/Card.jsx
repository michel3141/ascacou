import React from 'react'
import '/css/Card.css'
import mkClasses from '/lib/mkClasses'

export default function Card({ value, done }) {
  const className = mkClasses('Card', `m-${value}`, { done })
  return <div {...{ className }} />
}

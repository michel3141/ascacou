import React from 'react'
import '/css/Square.css'
import { useCurrentConfigSlice } from '/app/slices'

const Square = ({ square, onSelect }) => {
  const { useShowBlocked, useShowForbidden } = useCurrentConfigSlice()
  const showBlocked = useShowBlocked()
  //const showForbidden = useShowForbidden()
  const onMouseDown = e => {
    e.preventDefault() // click
    onSelect('')
  }

  let { content } = square
  const { coord } = square
  if (showBlocked && square.playable().length === 0) content = content || 3
  const className = `Square xy-${coord} c-${content}`
  return <div {...{ className, onMouseDown }} onTouchStart={onMouseDown}></div>
}

export default Square

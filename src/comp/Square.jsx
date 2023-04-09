import React from 'react'
import '/css/Square.css'

const Square = ({ square, onSelect, showBlocked }) => {
  const onMouseDown = e => {
    e.preventDefault() // click
    onSelect('')
  }

  let { content } = square
  const { coord } = square
  // showForbidden est traité à l'arrache
  // dans lib/Ascacou avec le cb()
  if (showBlocked && square.playable().length === 0) content = content || 3
  const className = `Square xy-${coord} c-${content}`
  return <div {...{ className, onMouseDown }} onTouchStart={onMouseDown}></div>
}

export default Square

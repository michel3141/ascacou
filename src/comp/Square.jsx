import React from 'react'
import '/css/Square.css'
import { useCurrentConfigSlice, useBoardSlice } from '/app/slices'

const Square = ({ coord }) => {
  const { useShowBlocked, useShowForbidden } = useCurrentConfigSlice()
  const { select, useSquareByCoord } = useBoardSlice()
  const showBlocked = useShowBlocked()
  const square = useSquareByCoord(coord)
  //const showForbidden = useShowForbidden()
  const onMouseDown = e => {
    e.preventDefault() // click
    select(square)
  }

  let { content } = square
  //if (showBlocked && square.playable().length === 0) content = content || 3
  const className = `Square xy-${coord} c-${content}`
  return (
    <div
      {...{ className, onMouseDown }}
      onTouchStart={onMouseDown}
    ></div>
  )
}

export default Square

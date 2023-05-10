import React from 'react'
import './Square.css'
import { BLOCKED, EMPTY } from '/app/constants/colors'
import { useParamsSlice, useBoardSlice } from '/app/slices'

const Square = ({ coord }) => {
  const { useShowBlocked, useShowForbidden } = useParamsSlice()
  const { select, useSquareByCoord } = useBoardSlice()
  const showBlocked = useShowBlocked()
  const square = useSquareByCoord(coord)
  const showForbidden = useShowForbidden()

  const { content, alert } = square
  const color = content !== BLOCKED || showBlocked ? content : EMPTY
  const className = `Square xy-${coord} c-${alert && showForbidden ? alert : color}`
  return (
    <div
      {...{ className }}
      onMouseDown={() => console.log('ICI') || select(square)}
      onTouchStart={() => select(square)}
    ></div>
  )
}

export default Square

import React from 'react'
import { Grid } from '@mui/material'
import '/css/Selector.css'

import { selector, useSelectorSlice } from '/app/slices'

import mkClasses from '/lib/mkClasses'

const { BLACK, WHITE } = selector

export default function Selector() {
  return (
    <Grided>
      <Option color={BLACK} />
      <Option color={WHITE} />
    </Grided>
  )
}

const Grided = ({ children }) => (
  <Grid
    className='Selector'
    container
    direction='row'
    justify='space-evenly'
    alignItems='flex-start'
  >
    {children.map((child, id) => (
      <Grid
        item
        xs
        key={id}
      >
        {child}
      </Grid>
    ))}
  </Grid>
)
const Option = ({ color }) => {
  const { select, useColor } = useSelectorSlice()
  const currentColor = useColor()
  const className = mkClasses({ Selected: color === currentColor })
  const src = {
    [BLACK]: 'img/noirs.png',
    [WHITE]: 'img/blancs.png',
  }[color]
  return (
    <div
      {...{ className }}
      onMouseDown={() => select(color)}
    >
      <img
        {...{ src }}
        onMouseDown={e => e.preventDefault() /* no-drag */}
      />
    </div>
  )
}

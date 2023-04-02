import React, { Component } from 'react'
import { Grid } from '@mui/material'
import '/css/Selector.css'

export default props => (
  <Grided>
    <Option {...props} value={1} />
    <Option {...props} value={2} />
  </Grided>
)

const Grided = ({ children }) => (
  <Grid
    className='Selector'
    container
    direction='row'
    justify='space-evenly'
    alignItems='flex-start'
  >
    {children.map((child, id) => (
      <Grid item xs key={id}>
        {child}
      </Grid>
    ))}
  </Grid>
)

import mkClasses from '/lib/mkClasses'
const Option = ({ value, current, onClick }) => {
  const className = mkClasses({ Selected: value === current })
  const src = {
    1: 'img/noirs.png',
    2: 'img/blancs.png',
  }[value]
  return (
    <div {...{ className }} onMouseDown={() => onClick(value)}>
      <img {...{ src }} onMouseDown={e => e.preventDefault() /* no-drag */} />
    </div>
  )
}

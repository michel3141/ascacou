import React, { Component } from 'react'
import { Grid } from '@mui/material'
import '/css/Selector.css'

export default function ({ current, onClick }) {
  const select1 = current == 1 ? 'Selected' : ''
  const select2 = current == 2 ? 'Selected' : ''
  return (
    <div className='Selector'>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='flex-start'
      >
        <Grid item xs>
          <div className={select1} onMouseDown={() => onClick(1)}>
            <img src='img/noirs.png' onMouseDown={e => e.preventDefault()} />
          </div>
        </Grid>
        <Grid item xs>
          <div className={select2} onMouseDown={() => onClick(2)}>
            <img src='img/blancs.png' onMouseDown={e => e.preventDefault()} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

import React, { useState } from 'react'

import { FIRST, SECOND } from '/app/constants/players'

import { Grid } from '@mui/material'

import Board from '/features/board/Board'

import Player from './Player'
import Selector from '/features/selector/Selector'
import '/css/Ascacou.css'

const Ascacou = () => {
  return (
    <div className='Ascacou'>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='flex-start'
      >
        <Grid
          item
          xs
        >
          <Player id={FIRST} />
        </Grid>
        <Grid
          item
          xs
        >
          <Grid
            container
            direction='column'
            alignItems='center'
            justify='space-evenly'
          >
            <Grid
              item
              xs
            >
              <Board />
            </Grid>
            <Grid
              item
              xs
            >
              <Selector />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs
        >
          <Player id={SECOND} />
        </Grid>
      </Grid>
      <div className='Fen'> ascacou.fen()</div>
    </div>
  )
}

export default Ascacou

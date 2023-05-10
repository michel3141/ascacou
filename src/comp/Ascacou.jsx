import React, { useState } from 'react'
import { Grid } from '@mui/material'

import AppBar from '/features/app/Bar'

import Game from '/lib/Ascacou'
import Board from '/features/board/Board'

import Player from './Player'
import Selector from '/features/selector/Selector'
import '/css/Ascacou.css'

const Ascacou = ({ ascacou, newGame }) => {
  const [z, Z] = useState(0)
  window.unused = z
  const forceUpdate = () => Z(p => p + 1) // TODO ceci est un hack

  const onAction = cmd => {
    const noop = () => undefined
    switch (cmd) {
      case 'undo':
        ascacou.undo()
        break
      case 'restart':
        while (ascacou.undo()) noop()
        break
    }
    forceUpdate()
  }

  return (
    <div className='Ascacou'>
      <AppBar />
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
          <Player
            id={1}
            name='Joueur 1'
            cards={ascacou.cards}
            player={ascacou.player}
          />
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
          <Player
            id={2}
            name='Joueur 2'
            cards={ascacou.cards}
            player={ascacou.player}
          />
        </Grid>
      </Grid>
      <div className='Fen'> {ascacou.fen()}</div>
    </div>
  )
}

export default Ascacou

import React, { useState } from 'react'
import { Grid, AppBar } from '@mui/material'
import Game from '/lib/Ascacou'
import Player from './Player'
import Board from './Board'
import Selector from './Selector'
import Menu from './Menu'
import Regles from './Regles'
import Config from './Config'
import '/css/Ascacou.css'

import {
  SkipPrevious,
  Help,
  Replay,
  Menu as MenuIcn,
} from '@mui/icons-material'

const actions = [
  {
    title: 'Recommencer au début',
    lbl: <SkipPrevious />,
    cmd: 'restart',
    enable: false,
  },
  {
    lbl: <Replay />,
    title: 'Annuler le coup',
    cmd: 'undo',
    long: 'restart',
    enable: true,
  },
]

const Ascacou = ({
  ascacou,
  newGame,
  updateConfig,
  prms /*
          allow_multiple_cards,
          deal_method,
          show_blocked,
          show_forbidden,
          */,
}) => {
  const [showRegles, setShowRegles] = useState(false)
  const [showNewGame, setShowNewGame] = useState(true)
  const [currentColor, setCurrentColor] = useState(1)

  const [z, Z] = useState(0)
  window.unused = z
  const forceUpdate = () => Z(p => p + 1) // TODO ceci est un hack

  const play = move => {
    move += currentColor
    const moved = ascacou.play(move)
    if (moved === null) return
    if (moved) {
      forceUpdate()
    } else {
      if (prms.show_forbidden) {
        forceUpdate()
        setTimeout(() => {
          ascacou.clear(move)
          forceUpdate()
        }, 750)
      } else {
        ascacou.clear(move)
      }
    }
  }
  const undo = () => ascacou.undo() && forceUpdate()
  const restart = () => {
    while (ascacou.undo()) forceUpdate()
  }

  const onAction = cmd => {
    if (cmd === 'undo') undo()
    if (cmd === 'restart') restart()
  }

  const onNewGame = prms => {
    setShowNewGame(false)
    newGame(prms)
  }

  return (
    <div className='Ascacou'>
      <AppBar position='static' color='transparent'>
        <Menu
          actions={actions}
          onAction={onAction}
          drawers={[
            {
              title: 'Règles',
              lbl: <Help />,
              action: <Regles />,
              visible: showRegles,
              enable: true,
              onToggle: v => setShowRegles(v),
            },
            {
              title: 'Nouvelle partie',
              lbl: <MenuIcn />,
              action: (
                <Config
                  prms={prms}
                  onApply={onNewGame}
                  updateConfig={updateConfig}
                  appClass={Game}
                />
              ),
              visible: showNewGame,
              enable: true,
              onToggle: v => setShowNewGame(v),
            },
          ]}
          titre={
            <img src='img/titre-t.png' onMouseDown={e => e.preventDefault()} />
          }
        />
      </AppBar>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='flex-start'
      >
        <Grid item xs>
          <Player
            id='1'
            name='Joueur 1'
            cards={ascacou.cards}
            player={ascacou.player}
          />
        </Grid>
        <Grid item xs>
          <Grid
            container
            direction='column'
            alignItems='center'
            justify='space-evenly'
          >
            <Grid item xs>
              <Board
                onMove={play}
                squares={ascacou.squares}
                showBlocked={prms.show_blocked}
                showForbidden={prms.show_forbidden}
              />
            </Grid>
            <Grid item xs>
              <Selector onClick={setCurrentColor} current={currentColor} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Player
            id='2'
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

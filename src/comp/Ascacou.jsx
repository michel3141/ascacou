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

import { SkipPrevious, Help, Replay, Menu as MenuIcn } from '@mui/icons-material'

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
  setPrefs,
  prefs /*
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
    /*
     * move = {
     * coord,
     * }
     */
    move = { ...move, content: currentColor }
    const moved = ascacou.play(move)
    if (moved === null) return
    if (moved) {
      forceUpdate()
    } else {
      if (prefs.show_forbidden) {
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

  const onNewGame = prefs => {
    setShowNewGame(false)
    newGame(prefs)
  }

  return (
    <div className='Ascacou'>
      <AppBar position='static' color='transparent'>
        <Menu
          actions={actions.map(action => ({
            ...action,
            cmd: () => onAction(action.cmd),
            long: () => onAction(action.long),
          }))}
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
              action: <Config {...{ prefs, setPrefs }} onApply={onNewGame} appClass={Game} />,
              visible: showNewGame,
              enable: true,
              onToggle: v => setShowNewGame(v),
            },
          ]}
          titre={<img src='img/titre-t.png' onMouseDown={e => e.preventDefault()} />}
        />
      </AppBar>
      <Grid container direction='row' justify='space-evenly' alignItems='flex-start'>
        <Grid item xs>
          <Player id={1} name='Joueur 1' cards={ascacou.cards} player={ascacou.player} />
        </Grid>
        <Grid item xs>
          <Grid container direction='column' alignItems='center' justify='space-evenly'>
            <Grid item xs>
              <Board
                onMove={play}
                squares={ascacou.squares}
                showBlocked={prefs.show_blocked}
                showForbidden={prefs.show_forbidden}
              />
            </Grid>
            <Grid item xs>
              <Selector onClick={setCurrentColor} current={currentColor} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Player id={2} name='Joueur 2' cards={ascacou.cards} player={ascacou.player} />
        </Grid>
      </Grid>
      <div className='Fen'> {ascacou.fen()}</div>
    </div>
  )
}

export default Ascacou

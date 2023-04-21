import React, { useState } from 'react'

import Game from '/lib/Ascacou'
import '/css/App.css'
// import Solver from 'ascacou-solver-wasm'

import Ascacou from './Ascacou'

export default function App(props) {
  /*
    show_blocked,
    show_forbidden,
    allow_multiple_cards,
    deal_method,
    */
  const [prefs, setPrefs] = useState({
    ...props,
    show_blocked: true,
    show_forbidden: true,
  })
  const [ascacou, setAscacou] = useState(() => new Game(prefs))

  const newGame = newPrefs => {
    // show_new_game ??
    // n'a rien n'à faire ici
    setPrefs({ show_new_game: false, ...newPrefs })
    setAscacou(new Game(newPrefs))
  }

  // const end_game = () => setAscacou(null)

  return (
    <div className='App'>
      {ascacou && <Ascacou {...{ ascacou, setPrefs, newGame, prefs }} />}
      <div className='Square hidden' />
    </div>
  )
}

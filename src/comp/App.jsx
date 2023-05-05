import React, { useState, useEffect } from 'react'
import { useCurrentConfigSlice } from '/app/slices'

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
  const { updateValue } = useCurrentConfigSlice()
  useEffect(() => {
    updateValue({
      ...props,
      show_blocked: true,
      show_forbidden: true,
    })
  }, [props])
  const [ascacou, setAscacou] = useState(
    () =>
      new Game({
        ...props,
        show_blocked: true,
        show_forbidden: true,
      })
  )

  const newGame = newPrefs => {
    // show_new_game ??
    // n'a rien n'à faire ici
    updateValue({ show_new_game: false, ...newPrefs })
    setAscacou(new Game(newPrefs))
  }

  // const end_game = () => setAscacou(null)

  return (
    <div className='App'>
      {ascacou && <Ascacou {...{ ascacou, newGame }} />}
      <div className='Square hidden' />
    </div>
  )
}

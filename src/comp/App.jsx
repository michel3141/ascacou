import React, { useEffect } from 'react';
import { useParamsSlice, useAppSlice } from '/app/slices';

import AppBar from '/features/app/Bar';
import '/css/App.css';
// import Solver from 'ascacou-solver-wasm'

import Ascacou from './Ascacou';

export default function App(props) {
  /*
    show_blocked,
    show_forbidden,
    allow_multiple_cards,
    deal_method,
    */
  const { newGame } = useParamsSlice();
  const { useReady, boot, toggleShowConfig } = useAppSlice();
  const ready = useReady();
  useEffect(() => {
    boot();
    newGame(props);
    toggleShowConfig(true);
  }, [props]);

  return (
    <div className='App'>
      <AppBar />
      {ready && <Ascacou />}
      <div className='Square pre-load' />
    </div>
  );
}

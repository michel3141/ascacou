import React, { useEffect } from 'react';
import { useAscacouSlice, useAppSlice } from '/app/slices';

import Ascacou from '/features/ascacou/Ascacou';
import AppBar from './Bar';
import './App.css';
// import Solver from 'ascacou-solver-wasm'


export default function App(props) {
  /*
    show_blocked,
    show_forbidden,
    allow_multiple_cards,
    deal_method,
    */
  const { newGame } = useAscacouSlice();
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

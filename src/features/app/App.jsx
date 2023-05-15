import React, { Suspense, lazy, useEffect } from 'react';
import { useAscacouSlice, useAppSlice } from '/app/slices';
import './App.css';

const Ascacou = lazy(() => import('/features/ascacou/Ascacou'));
const AppBar = lazy(() => import('./Bar'));
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
      <Suspense fallback={'...'}>
        <AppBar />
        {ready && <Ascacou />}
      </Suspense>
    </div>
  );
}

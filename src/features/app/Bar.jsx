import React, { useMemo, lazy, Suspense } from 'react';
import { SkipPrevious, Replay, Help, Menu as MenuIcn } from '@mui/icons-material';

import './Bar.scss';

import { AppBar } from '@mui/material';
import { RULES, VICTORY, CONFIG } from '/app/constants/drawers';
import titre from '/assets/img/titre-t.png';
import { useAppSlice, useAscacouSlice } from '/app/slices';

const Config = lazy(() => import('/features/params/Config'));
const Menu = lazy(() => import('./Menu'));
const Regles = lazy(() => import('./Regles'));
const Victoire = lazy(() => import('./Victoire'));

const Bar = () => {
  const { useDrawer, toggleDrawer } = useAppSlice();
  const activeDrawer = useDrawer();
  const { reset, undo } = useAscacouSlice();
  const actions = useMemo(
    () => [
      {
        id: 'test',
        title: 'Recommencer au début',
        lbl: <SkipPrevious />,
        cmd: undo,
        disabled: true,
      },
      {
        id: 'undo',
        lbl: <Replay />,
        title: 'Annuler le coup',
        cmd: undo,
        long: reset,
      },
    ],
    [reset, undo],
  );
  const visibility = (drawer) => ({
    visible: activeDrawer === drawer,
    onToggle: (v) => toggleDrawer(drawer, v),
  });
  return (
    <AppBar
      position='static'
      color='transparent'
    >
      <Suspense fallback={'...'}>
        <Menu
          actions={actions}
          drawers={[
            {
              title: 'Règles',
              lbl: <Help />,
              action: <Regles />,
              ...visibility(RULES),
            },
            {
              title: 'Nouvelle partie',
              lbl: <MenuIcn />,
              action: <Config />,
              ...visibility(CONFIG),
            },
            {
              action: <Victoire />,
              ...visibility(VICTORY),
            },
          ]}
          titre={
            <img
              src={titre}
              onMouseDown={(e) => e.preventDefault()}
            />
          }
        />
      </Suspense>
    </AppBar>
  );
};

export default Bar;

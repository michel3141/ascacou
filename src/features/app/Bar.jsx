import React, { useMemo } from 'react';
import { AppBar } from '@mui/material';
import { RULES, VICTORY, CONFIG } from '/app/constants/drawers';
import titre from '/assets/img/titre-t.png';
import { useAppSlice, useParamsSlice } from '/app/slices';
import Config from '/features/params/Config';
import Menu from './Menu';
import Regles from './Regles';
import Victoire from './Victoire';

import { SkipPrevious, Replay, Help, Menu as MenuIcn } from '@mui/icons-material';

const Bar = () => {
  const { useDrawer, toggleDrawer } = useAppSlice();
  const activeDrawer = useDrawer();
  const { newGame } = useParamsSlice();
  const actions = useMemo(
    () => [
      {
        title: 'Recommencer au début',
        lbl: <SkipPrevious />,
        cmd: () => console.log('TODO undo'),
        disabled: true,
      },
      {
        lbl: <Replay />,
        title: 'Annuler le coup',
        cmd: () => console.log('TODO undo'),
        long: () => newGame({}),
      },
    ],
    [newGame]
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
    </AppBar>
  );
};

export default Bar;

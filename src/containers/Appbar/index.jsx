import React, { useMemo, useCallback, Suspense, lazy } from 'react';
import { Help, Menu as MenuIcn } from '@mui/icons-material';

import './Appbar.scss';

import { AppBar } from '@mui/material';
import { RULES, VICTORY, CONFIG } from '~/features/ui/constants';
import titre from '~assets/img/titre-t.png';
import { useUi } from '~/features/ui';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useFullscreen } from 'fullscreen-slice';

const Config = lazy(() => import('~/containers/Config'));
const Menu = lazy(() => import('./Menu'));
const Regles = lazy(() => import('~/containers/Regles'));
const Victoire = lazy(() => import('~/containers/Victoire'));

const Bar = () => {
  const drawers = useDrawers();
  const actions = [useFullscreenAction()];
  return (
    <AppBar
      position='static'
      color='transparent'
      className='Appbar'
    >
      <MyMenu {...{ drawers, actions }} />
    </AppBar>
  );
};

const MyMenu = ({ actions = [], drawers = [] }) => (
  <Menu
    {...{ actions, drawers }}
    titre={
      <img
        className='Title'
        src={titre}
        onMouseDown={(e) => e.preventDefault()}
      />
    }
  />
);

const useFullscreenAction = () => {
  const { useFullscreenEnabled, toggle, useIsFullscreen } = useFullscreen();
  const isFullscreen = useIsFullscreen();
  const fullscreenEnabled = useFullscreenEnabled();
  return useMemo(
    () =>
      fullscreenEnabled
        ? {
            id: 'enter-fullscreen',
            description: isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />,
            title: isFullscreen ? 'Quitter le plein écran' : 'Mode plein écran',
            cmd: () => toggle('fullscreen-app'),
            disabled: !fullscreenEnabled,
          }
        : null,
    [fullscreenEnabled, isFullscreen, toggle],
  );
};

const useDrawers = () => {
  const { useDrawer, toggleDrawer } = useUi();
  const activeDrawer = useDrawer();

  const visibility = useCallback(
    (drawer) => ({
      visible: activeDrawer === drawer,
      onToggle: (v) => toggleDrawer(drawer, v),
    }),
    [toggleDrawer, activeDrawer],
  );
  return useMemo(
    () => [
      {
        id: 'config',
        title: 'Nouvelle partie',
        description: <MenuIcn />,
        content: (
          <Suspense>
            <Config />
          </Suspense>
        ),
        ...visibility(CONFIG),
      },
      {
        id: 'rules',
        title: 'Règles',
        description: <Help />,
        content: (
          <Suspense>
            <Regles />
          </Suspense>
        ),
        ...visibility(RULES),
      },
      {
        id: 'end-game',
        content: (
          <Suspense>
            <Victoire />
          </Suspense>
        ),
        ...visibility(VICTORY),
      },
    ],
    [visibility],
  );
};
export default Bar;

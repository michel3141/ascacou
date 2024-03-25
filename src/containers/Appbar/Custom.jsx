/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Suspense } from 'react';
import {
  Drawer as MuiDrawer,
  IconButton as MuiIconButton,
} from '@mui/material';
import { useUi } from '~/features/ui';

import { useFullscreen } from 'fullscreen-slice';
const Drawer = ({ children, drawerId, ...params }) => {
  const { useDrawer, toggleDrawer } = useUi();
  const activeDrawer = useDrawer();

  const { useIsFullscreen } = useFullscreen();
  const isFullscreen = useIsFullscreen();
  const container = isFullscreen
    ? document.getElementById('fullscreen-app')
    : null;
  return (
    <Suspense>
      <MuiDrawer
        open={activeDrawer === drawerId}
        onClose={() => toggleDrawer(drawerId, false)}
        anchor='left'
        {...params}
        {...{ container }}
      >
        {children}
      </MuiDrawer>
    </Suspense>
  );
};

const IconButton = ({ children, drawerId, ...params }) => {
  const { toggleDrawer } = useUi();
  return (
    <MuiIconButton
      onClick={() => toggleDrawer(drawerId)}
      color='inherit'
      {...params}
    >
      {children}
    </MuiIconButton>
  );
};

export { Drawer, IconButton };

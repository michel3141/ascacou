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

import { lazy } from 'react';
import { Drawer } from '../Custom';
import { VICTORY as drawerId } from '~/features/ui/constants';

const Victoire = lazy(() => import('~/containers/Victoire'));
const VictoireDrawer = () => {
  return (
    <Drawer
      {...{ drawerId }}
      anchor='top'
      PaperProps={{
        sx: { left: '25%', width: '50%', height: '80%' },
      }}
    >
      <Victoire />
    </Drawer>
  );
};

export const VictoireIcon = () => null;
export default VictoireDrawer;

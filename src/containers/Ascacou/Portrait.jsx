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

import { Grid } from '@mui/material';
import Selector from '~/containers/Selector';
import Score from './Score';
import Board from '~/containers/Board';
import Hand from '~/containers/Hand';

const aspectThreshold = 0.67;

const Layout = ({ LEFT, RIGHT, aspect }) => {
  const { style } = window.document.documentElement; // html
  if (aspect > aspectThreshold && aspect < 1.15) {
    style.setProperty('--ascacou-scale', aspectThreshold / aspect);
  } else {
    style.setProperty('--ascacou-scale', 1);
  }
  return (
    <Grid
      container
      spacing={0}
      textAlign='center'
      alignItems='center'
    >
      <Grid
        item
        xs={12}
      >
        <Hand pos={LEFT} />
      </Grid>
      <Grid
        item
        xs={8}
      >
        <Board />
      </Grid>
      <Grid
        item
        xs={4}
      >
        <Selector />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Score {...{ LEFT, RIGHT }} />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Hand pos={RIGHT} />
      </Grid>
    </Grid>
  );
};

export default Layout;

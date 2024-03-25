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
import Score from './Score';
import Board from '~/containers/Board';
import Hand from '~/containers/Hand';

const aspectThreshold = 2.41;
const xs = [4, 4, 4];

const Layout = ({ LEFT, RIGHT, aspect }) => {
  const { style } = window.document.documentElement; // html
  if (aspect > aspectThreshold) {
    style.setProperty('--ascacou-scale', aspectThreshold / aspect);
  } else {
    style.setProperty('--ascacou-scale', 1);
  }
  return (
    <Grid
      container
      direction='row'
      justify='space-evenly'
      alignItems='flex-start'
    >
      <Grid
        item
        xs={xs[0]}
      >
        <Hand pos={LEFT} />
      </Grid>
      <Grid
        item
        xs={xs[1]}
      >
        <Grid
          container
          direction='column'
          alignItems='center'
          justify='space-evenly'
        >
          <Grid item>
            <Board />
          </Grid>
          <Grid item>
            <Score {...{ LEFT, RIGHT }} />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={xs[2]}
      >
        <Hand pos={RIGHT} />
      </Grid>
    </Grid>
  );
};
export default Layout;

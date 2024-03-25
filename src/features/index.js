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

import * as connection from './connection';
import * as game from './game';
import * as app from './app';
import * as players from './players';
import * as selection from './selection';
import * as alerts from './alerts';
import * as theme from './theme';
import * as ui from './ui';
import * as user from './user';
import * as fullscreen from 'fullscreen-slice';
import 'viewport-slice';

export default {
  connection,
  game,
  app,
  players,
  selection,
  alerts,
  theme,
  ui,
  user,
  fullscreen,
};

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

import { attr, belongsTo, hasMany } from 'spraypaint';

// ####### AppModel ################

export const AppModel = {
  jsonapiType: 'apps',

  attrs: {
    id: attr({}),
    name: attr({
      persist: false,
    }),
    defaultConfig: attr({
      persist: false,
      dirtyChecker: (a, b) => JSON.stringify(a) !== JSON.stringify(b),
    }),
  },
};

// ####### CardModel ################

export const CardModel = {
  jsonapiType: 'cards',

  attrs: {
    id: attr({}),
    value: attr({}),
    hand: attr({}),
  },
};

// ####### GameModel ################

export const GameModel = {
  jsonapiType: 'games',

  attrs: {
    id: attr({}),
    firstToMove: attr({}),
    app: belongsTo(),
    moves: hasMany(),
    cards: hasMany(),
    params: hasMany(),
  },
};

// ####### MoveModel ################

export const MoveModel = {
  jsonapiType: 'moves',

  attrs: {
    id: attr({}),
    coord: attr({}),
    content: attr({}),
    rank: attr({}),
  },
};

// ####### ParamBooleanModel ################

export const ParamBooleanModel = {
  jsonapiType: 'param_booleans',

  attrs: {
    id: attr({}),
    name: attr({}),
    dataType: attr({}),
    value: attr({}),
  },
};

// ####### ParamModel ################

export const ParamModel = {
  jsonapiType: 'params',

  attrs: {
    id: attr({}),
    name: attr({}),
    dataType: attr({}),
  },
};

// ####### ParamStringEnumModel ################

export const ParamStringEnumModel = {
  jsonapiType: 'param_string_enums',

  attrs: {
    id: attr({}),
    name: attr({}),
    dataType: attr({}),
    value: attr({}),
  },
};

// ####### UserModel ################

export const UserModel = {
  jsonapiType: 'users',

  attrs: {
    id: attr({}),
    name: attr({}),
  },
};

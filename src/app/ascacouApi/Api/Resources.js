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

import {
  AppModel,
  CardModel,
  GameModel,
  MoveModel,
  ParamBooleanModel,
  ParamModel,
  ParamStringEnumModel,
  UserModel,
} from './Models';

import { createResource } from 'spraypaint-toolkit';

export const AppResource = (connection, extra) =>
  createResource(connection, AppModel, extra);
export const CardResource = (connection, extra) =>
  createResource(connection, CardModel, extra);
export const GameResource = (connection, extra) =>
  createResource(connection, GameModel, extra);
export const MoveResource = (connection, extra) =>
  createResource(connection, MoveModel, extra);
export const ParamBooleanResource = (connection, extra) =>
  createResource(connection, ParamBooleanModel, extra);
export const ParamResource = (connection, extra) =>
  createResource(connection, ParamModel, extra);
export const ParamStringEnumResource = (connection, extra) =>
  createResource(connection, ParamStringEnumModel, extra);
export const UserResource = (connection, extra) =>
  createResource(connection, UserModel, extra);

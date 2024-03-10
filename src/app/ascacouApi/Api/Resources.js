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

export const AppResource = (connection, extra) => createResource(connection, AppModel, extra);
export const CardResource = (connection, extra) => createResource(connection, CardModel, extra);
export const GameResource = (connection, extra) => createResource(connection, GameModel, extra);
export const MoveResource = (connection, extra) => createResource(connection, MoveModel, extra);
export const ParamBooleanResource = (connection, extra) =>
  createResource(connection, ParamBooleanModel, extra);
export const ParamResource = (connection, extra) => createResource(connection, ParamModel, extra);
export const ParamStringEnumResource = (connection, extra) =>
  createResource(connection, ParamStringEnumModel, extra);
export const UserResource = (connection, extra) => createResource(connection, UserModel, extra);

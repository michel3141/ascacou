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

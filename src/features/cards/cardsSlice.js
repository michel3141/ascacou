import rtk, { _ } from '/lib/rtk';
import { params } from '/app/slices';

import { dealMethods } from '/app/constants/cards';
import { FIRST, SECOND } from '/app/constants/players';

export const name = 'cards';
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')

const { newGame } = params.actions;

const complement = (a) =>
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].filter((value) => !a.includes(value));

const initialState = {
  [FIRST]: null,
  [SECOND]: null,
};

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState);

export const actions = createActions({
  toggleActive: _,
});

export const selectors = createSelectors({
  cards_by_player_id: (id) => (state) => state.cards[id],
  score: (state) =>
    Object.keys(state.cards).reduce(
      (acc, id) => ({
        ...acc,
        [id]: state.cards[id].filter((card) => card.active).length,
      }),
      {}
    ),
});

const inflate = (id) => ({ id, active: false });
export default createReducer({
  [newGame]: (state, { payload }) => {
    const dealMethod = payload?.deal_method || 'random';
    const cards = dealMethods[dealMethod];
    state[FIRST] = cards.map(inflate);
    state[SECOND] = complement(cards).map(inflate);
  },
  [actions.toggleActive]: (state, { payload }) => {
    const ids = payload;
    [...state[FIRST], ...state[SECOND]]
      .filter((card) => ids.includes(card.id))
      .forEach((card) => (card.active = true));
  },
});

export { listener };

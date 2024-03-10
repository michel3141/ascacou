import rtk /* ,{addListener}, {set, update} */ from 'rtk';

/*
 * constants
 */
import { name, FIRST, SECOND } from './constants';

/*
 * actions
 */
import { updatePlayer, onSwap } from './actions';
import { playerIn, playerOut } from '~/features/game/actions';

/* ************************ */

const { createReducer } = rtk(name);

const initialState = {
  [FIRST]: { id: null, name: '' },
  [SECOND]: { id: null, name: '' },
};

export const reducer = createReducer(initialState, {
  [playerIn]: (state, { payload }) => {
    const { userId, user, position } = payload;
    state[position] = { ...user, id: userId };
  },
  [playerOut]: (state, { payload }) => {
    const { position } = payload; // TODO on pourrait vérifier userId
    state[position] = { id: null, name: '' };
  },
  [onSwap]: (state, { payload }) => {
    const first = state[FIRST];
    const second = state[SECOND];
    state[FIRST] = second;
    state[SECOND] = first;
  },
  [updatePlayer]: (state, { payload }) => {
    const { id, name } = payload;
    const element = Object.entries(state).find(([k, v]) => v.id === id);
    if (element) {
      const [pos] = element;
      state[pos].name = name;
    } else {
      return state;
    }
  },
});

// addListener(action, ({ payload }, { dispatch, getState })=>{});

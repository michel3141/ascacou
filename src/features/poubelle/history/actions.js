import rtk, { _ } from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/*
 * selectors
 */
import { selectIsEmpty, selectFirst } from './selectors';

/* ************************ */

const { createActions, createThunks } = rtk(name);

const actions = createActions({
  add: (datum) => _({ datum }),
  clear: (callback) => _({ callback }),
  restore: (datum) => _(datum),
});

const thunks = createThunks({
  reset: (_, { dispatch, getState }) => {
    if (selectIsEmpty(getState())) {
      throw new Error('history is empty');
    }
    const datum = selectFirst(getState());
    dispatch(restore(datum));
  },
});

// RTK-AUTOEXPORT
// ---- actions ---------
export const { add, clear, restore } = actions;
// ---- thunks ---------
export const { reset } = thunks;

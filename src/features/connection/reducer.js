import rtk /* , {set, update} */ from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/*
 * actions
 */
import { find, create } from '~/features/user/actions';

/* ************************ */

const { createReducer } = rtk(name);

const initialState = {
  url: '',
  apiPath: '',
  cablePath: '/cable',
  clientApplication: '',
};

export const reducer = createReducer(initialState, {
  [find.fulfilled]: (state, { payload }) => {
    state.cablePath = `/cable?userId=${payload.id}`;
  },
  [create.fulfilled]: (state, { payload }) => {
    state.cablePath = `/cable?userId=${payload.id}`;
  },
  '@boot': (state, { payload }) => {
    const { url, apiPath, clientApplication } = payload;
    return { ...state, url, apiPath, clientApplication };
  },
});

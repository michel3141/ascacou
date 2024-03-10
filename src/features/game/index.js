import { useSlice } from 'rtk/react';

import './middlewares';
import * as constants from './constants';

import * as selectors from './selectors';
import * as actions from './actions';
import { reducer } from './reducer';

export { constants, selectors, actions, reducer };

export const useGame = () => useSlice({ actions, selectors });

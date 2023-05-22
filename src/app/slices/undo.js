/*
 * pas utilisé.
 * voir https://github.com/omnidan/redux-undo
 * et https://redux.js.org/usage/implementing-undo-history
 *
 * ce module permet d'utiliser undo et redo en react
 */

import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';

export const useUndo = () => {
  const dispatch = useDispatch();
  const dispatchs = useMemo(() => bindActionCreators(ActionCreators, dispatch), [dispatch]);
  return dispatchs;
};

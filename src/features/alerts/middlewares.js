import { addListener /* , {set, update} */ } from 'rtk';

/*
 * constants
 */

/*
 * actions
 */
import { del } from './actions';
import { invalidMove } from '~/features/app/actions';

/* ************************ */

// GRAPH app:invalidMove > alert:1
// GRAPH alert:1 < alert:del
addListener(invalidMove, ({ payload }, { dispatch, getState }) => {
  setTimeout(() => dispatch(del(payload)), 750);
});

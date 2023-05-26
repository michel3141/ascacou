import { useSlice } from '/lib/react-redux';

import * as theme from './theme';
import * as ascacou from '../../features/ascacou/ascacouSlice';
import * as params from '../../features/params/paramsSlice';
import * as app from '../../features/app/appSlice';
import * as board from '../../features/board/boardSlice';
import * as selector from '../../features/selector/selectorSlice';
import * as players from '../../features/players/playersSlice';
import * as cards from '../../features/cards/cardsSlice';

const slices = { theme, app, ascacou, board, cards, params, players, selector };
export { theme, app, ascacou, board, cards, params, players, selector };

export const reducers = Object.entries(slices).reduce(
  (acc, [name, slice]) => ({
    ...acc,
    [name]: slice.default,
  }),
  {},
);

export const useThemeSlice = () => useSlice(theme);
export const useAppSlice = () => useSlice(app);
export const useAscacouSlice = () => useSlice(ascacou);
export const useBoardSlice = () => useSlice(board);
export const useCardsSlice = () => useSlice(cards);
export const useParamsSlice = () => useSlice(params);
export const usePlayersSlice = () => useSlice(players);
export const useSelectorSlice = () => useSlice(selector);

export default slices;

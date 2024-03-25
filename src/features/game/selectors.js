/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 * 
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 * 
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 * 
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import rtk from 'rtk';

/*
 * constants
 */
import { name, coords, EMPTY, BLACK, WHITE, BLOCKED } from './constants';
import { FIRST, SECOND } from '~/features/players/constants';

/*
 * selectors
 */
import { selectAlertByCoord } from '~/features/alerts/selectors';
import { selectChannelConsumer } from '~/features/connection/selectors';

/*
 * imports
 */
import { canPlay, findActiveCards } from '~/features/app/helpers';

/* ************************ */

const { createSelectors } = rtk(name);

const actives = createSelectors({
  id: (state) => state[name]?.id,
  game: (state) => {
    const game = state[name]?.dup();
    if (game) {
      Object.entries(game.relationships).forEach(([key, data]) => {
        if (Array.isArray(data)) {
          game[key] = data.map((x) => x.dup());
        } else {
          game[key] = data.dup();
        }
      });
    }
    return game;
  },
  active_cards: [
    (state) =>
      JSON.stringify(
        selectSquares(state).map((square) => {
          switch (square.content) {
            case BLACK:
            case WHITE:
              return { ...square };
            default:
              return { ...square, content: EMPTY };
          }
        }),
      ),
    (board) => findActiveCards(JSON.parse(board)),
  ],
});

const cards = createSelectors({
  cards_by_player_pos: [
    (state, pos) => state[name].cards,
    (state, pos) => pos,
    actives.selectActiveCards,
    (cards, pos, activeCards) =>
      cards
        .filter((card) => card.hand === pos)
        .map((card) => ({
          ...card,
          active: activeCards.includes(card.value),
        })),
  ],
  count_active_cards_by_player_pos: [
    actives.selectActiveCards,
    (state, pos) => state[name].cards,
    (state, pos) => pos,
    (activeCards, cards, pos) =>
      cards.filter((card) => card.hand === pos).filter((card) => activeCards.includes(card.value))
        .length,
  ],
});

const getParamValue = (params, name) => params.find((param) => param.name === name)?.value;
const params = createSelectors({
  params: (state) => state[name]?.params,
  show_blocked: [(state) => selectParams(state), (params) => getParamValue(params, 'show_blocked')],
  show_forbidden: [
    (state) => selectParams(state),
    (params) => getParamValue(params, 'show_forbidden'),
  ],
  allow_multiple_cards: [
    (state) => selectParams(state),
    (params) => getParamValue(params, 'allow_multiple_cards'),
  ],
});

const squares = createSelectors({
  squares: [
    (state) => state[name].moves,
    (moves) => {
      const hashed = moves.reduce((acc, move) => ({ ...acc, [move.coord]: move.attributes }), {});
      return coords.map((coord) => hashed[coord] || { coord, content: EMPTY });
    },
  ],
  moves: (state) => state[name].moves,
  move_count: [(state) => selectMoves(state), (moves) => moves.length],
  can_undo: [(state) => selectMoveCount(state), (moveCount) => moveCount > 0],
  is_first_turn: [(state) => selectMoveCount(state), (moveCount) => moveCount === 0],
  current_player_pos: [
    (state) => selectMoveCount(state),
    (state) => state[name].firstToMove,
    (state) => (state[name].firstToMove === FIRST ? SECOND : FIRST),
    (moveCount, firstToMove, secondToMove) => (moveCount % 2 === 0 ? firstToMove : secondToMove),
  ],
  square_by_coord: [
    (state, coord) => selectSquares(state),
    (state, coord) => coord,
    selectAlertByCoord,
    (state) => selectAllowMultipleCards(state),
    (state, coord) => selectShowForbidden(state),
    (state, coord) => selectShowBlocked(state),
    (squares, coord, alertSquare, allowMultipleCards, showForbidden, showBlocked) => {
      const square = squares.find((square) => square.coord === coord);
      if (!allowMultipleCards) {
        if (alertSquare && showForbidden) {
          return { ...alertSquare, alert: true, blocked: false };
        }
        if (
          showBlocked &&
          square.content === EMPTY &&
          !canPlay(squares, square, WHITE) &&
          !canPlay(squares, square, BLACK)
        ) {
          return { ...alertSquare, alert: false, blocked: true };
        }
      }
      return { ...square, alert: false, blocked: false };
    },
  ],
  free_squares_count: (state) => {
    const squares = selectSquares(state);
    const allowMultipleCards = selectAllowMultipleCards(state);
    return squares
      .filter((square) => square.content === EMPTY)
      .filter(
        (square) =>
          allowMultipleCards || canPlay(squares, square, WHITE) || canPlay(squares, square, BLACK),
      ).length;
  },
});

const channel = createSelectors({
  channel_identifier: [
    (state) => 'GameChannel',
    (state) => state[name].id,
    (channel, id) =>
      id
        ? {
            channel,
            id,
          }
        : null,
  ],
  channel: [
    selectChannelConsumer,
    (state) => selectChannelIdentifier(state),
    (consumer, identifier) => {
      if (!identifier) return null;
      identifier = JSON.stringify(identifier);
      return consumer.subscriptions.subscriptions.find(
        (subscription) => subscription.identifier === identifier,
      );
    },
  ],
});

const stats = createSelectors({
  is_running: (state) => selectFreeSquaresCount(state) !== 0,
  score: [
    (state) => selectCountActiveCardsByPlayerPos(state, FIRST),
    (state) => selectCountActiveCardsByPlayerPos(state, SECOND),
    (first, second) => ({ [FIRST]: first, [SECOND]: second }),
  ],
  fen: [
    // humm pas vraiment la place
    (state) => selectId(state),
    (state) => selectCurrentPlayerPos(state),
    (state) => selectCardsByPlayerPos(state, FIRST),
    (state) => selectCardsByPlayerPos(state, SECOND),
    (state) => selectSquares(state),
    (gameId, hand, cards1, cards2, squares) => {
      const fen = [];
      let empty = 0;
      let line = '';
      for (const row of [1, 2, 3, 4, 5]) {
        for (const col of [1, 2, 3, 4, 5]) {
          const coord = `${row}x${col}`;
          const square = squares.find((square) => square.coord === coord);
          const { content } = square || { content: EMPTY };
          if (content === EMPTY || content === BLOCKED) {
            empty += 1;
          } else {
            if (empty > 0) {
              line += empty;
              empty = 0;
            }

            if (content === BLACK) {
              line += 'b';
            } else if (content === WHITE) {
              line += 'w';
            }
          }
        }
        if (empty > 0) {
          line += empty;
          empty = 0;
        }
        fen.push(line);
        line = '';
      }
      const board = fen.join('/');

      const cards = (hand === SECOND ? cards2 : cards1)
        .map((card) => card.value.toString(16))
        .sort();
      const myCards = cards.join('');
      return [`[${gameId}]`, board, myCards].join(' ');
    },
  ],
});

// RTK-AUTOEXPORT
// ---- selectors ---------
export const { selectId, selectGame, selectActiveCards } = actives;
// ---- selectors ---------
export const { selectCardsByPlayerPos, selectCountActiveCardsByPlayerPos } = cards;
// ---- selectors ---------
export const { selectParams, selectShowBlocked, selectShowForbidden, selectAllowMultipleCards } =
  params;
// ---- selectors ---------
export const {
  selectSquares,
  selectMoves,
  selectMoveCount,
  selectCanUndo,
  selectIsFirstTurn,
  selectCurrentPlayerPos,
  selectSquareByCoord,
  selectFreeSquaresCount,
} = squares;
// ---- selectors ---------
export const { selectChannelIdentifier, selectChannel } = channel;
// ---- selectors ---------
export const { selectIsRunning, selectScore, selectFen } = stats;

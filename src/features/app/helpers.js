import { BLACK, WHITE } from '~/features/game/constants';
const inters = [
  ['1x1', '1x2', '2x1', '2x2'],
  ['1x2', '1x3', '2x2', '2x3'],
  ['1x3', '1x4', '2x3', '2x4'],
  ['1x4', '1x5', '2x4', '2x5'],
  ['2x1', '2x2', '3x1', '3x2'],
  ['2x2', '2x3', '3x2', '3x3'],
  ['2x3', '2x4', '3x3', '3x4'],
  ['2x4', '2x5', '3x4', '3x5'],
  ['3x1', '3x2', '4x1', '4x2'],
  ['3x2', '3x3', '4x2', '4x3'],
  ['3x3', '3x4', '4x3', '4x4'],
  ['3x4', '3x5', '4x4', '4x5'],
  ['4x1', '4x2', '5x1', '5x2'],
  ['4x2', '4x3', '5x2', '5x3'],
  ['4x3', '4x4', '5x3', '5x4'],
  ['4x4', '4x5', '5x4', '5x5'],
];

export const findActiveCards = (squares) => {
  const cards = [];
  for (const inter of inters) {
    let card = 0;
    for (const coord of inter) {
      card *= 2;
      const { content } = squares.find((square) => square.coord === coord);
      if (content === BLACK) {
        card += 0;
      } else if (content === WHITE) {
        card += 1;
      } else {
        card = -1;
        break;
      }
    }
    if (card >= 0) {
      cards.push(card);
    }
  }
  return cards;
};

const hasDuplicates = (arrayOfInts) => {
  const map = {};
  for (const item of arrayOfInts) {
    if (item in map) {
      return true;
    } else {
      map[item] = true;
    }
  }
  return false;
};

export const canPlay = (squares, square, color) => {
  // détermine les coups restants jouables sur chaque case
  // en fonction des règles en cours
  const newSquares = squares.map((prev) =>
    prev.coord === square.coord ? { ...square, content: color } : prev,
  );
  const cards = findActiveCards(newSquares);
  return !hasDuplicates(cards);
};

export const reduceParams = (...params) =>
  Object.values(
    params.flat().reduce(
      (acc, param) => ({
        ...acc,
        [param.name]: { ...params[param.name], ...param },
      }),
      {},
    ),
  );

export const prepareConfig = (...params) => {
  const preparedParams = params.flat().reduce((acc, param) => {
    if (!(param.name in acc)) {
      acc[param.name] = {};
    }
    const newAcc = {
      ...acc,
      [param.name]: {
        ...acc[param.name],
        ...param,
        enable: false,
        id: undefined,
      },
    };
    return newAcc;
  }, {});
  preparedParams.show_blocked.enable = !preparedParams.allow_multiple_cards.value;
  preparedParams.show_forbidden.enable = !preparedParams.allow_multiple_cards.value;
  return Object.values(preparedParams);
};

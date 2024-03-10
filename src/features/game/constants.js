import { FIRST, SECOND } from '~/features/players/constants';

export const name = 'game';
// ne fonctionne plus quand on build
// (typeof module === 'undefined' ? import.meta.url : module.id)
//   .split('/')
//   .slice(-2)
//   .at(0);

export const EMPTY = 'EMPTY';
export const BLACK = 'BLACK';
export const WHITE = 'WHITE';
export const BLOCKED = 'BLOCKED';
export const NO_COORD = '0x0';

export const gameInc = (window.gi = ['app', 'moves', 'params', 'cards']);
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const complement = (a) =>
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].filter((value) => !a.includes(value));

const dealMethods = {
  get random() {
    const hand1 = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).slice(0, 8);
    const hand2 = complement(hand1);
    return [hand1, hand2];
  },
  get bnw() {
    const hand1 = [0, 1, 2, 4, 8, 3, 5, 6];
    const hand2 = complement(hand1);
    return [hand1, hand2];
  },
  get extrem() {
    const hand1 = [0, 15, 1, 2, 4, 14, 13, 11];
    const hand2 = complement(hand1);
    return [hand1, hand2];
  },
  get symetric() {
    const hand1 = [0, 1, 2, 11, 7, 3, 5, 4];
    const hand2 = complement(hand1);
    return [hand1, hand2];
  },
};

export const coords = [
  '1x1',
  '1x2',
  '1x3',
  '1x4',
  '1x5',
  '2x1',
  '2x2',
  '2x3',
  '2x4',
  '2x5',
  '3x1',
  '3x2',
  '3x3',
  '3x4',
  '3x5',
  '4x1',
  '4x2',
  '4x3',
  '4x4',
  '4x5',
  '5x1',
  '5x2',
  '5x3',
  '5x4',
  '5x5',
];

export const newDeal = (dealMethod) => {
  const [hand1, hand2] = dealMethod in dealMethods ? dealMethods[dealMethod] : [[], []];
  return [
    hand1.map((value) => ({ value, hand: FIRST })),
    hand2.map((value) => ({ value, hand: SECOND })),
  ].flat();
};

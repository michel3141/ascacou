export const deals = {
  random: {
    lbl: 'Aléatoire',
    order: 1,
  },
  bnw: {
    lbl: 'Noirs et Blancs',
    order: 2,
  },
  extrem: {
    lbl: 'Extrêmes et Médianes',
    order: 3,
  },
  symetric: {
    lbl: 'Symétrique',
    order: 4,
  },
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const deal_methods = {
  get random() {
    return shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).slice(0, 8)
  },
  bnw: [0, 1, 2, 4, 8, 3, 5, 6],
  //'1111:1 1112:1 1121:1 1211:1 2111:1 1122:1 1212:1 1221:1  2222:2 2221:2 2212:2 2122:2 1222:2 2211:2 2121:2 2112:2',
  extrem: [0, 15, 1, 2, 4, 14, 13, 11],
  //'1111:1 2222:1 1112:1 1121:1 1211:1 2221:1 2212:1 2122:1 1122:2 1212:2 2112:2 1221:2 2121:2 2211:2 2111:2 1222:2',
  symetric: [0, 1, 2, 11, 7, 3, 5, 4],
  //    '1111:1 1112:1 1121:1 2122:1 1222:1 1122:1 1212:1 1221:1  2222:2 2221:2 2212:2 1211:2 2111:2 2211:2 2121:2 2112:2',
}

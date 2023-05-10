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
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

export const deal_methods = {
  random: function () {
    const card_dumps = [
      '1111',
      '1112',
      '1121',
      '2122',
      '1222',
      '1122',
      '1212',
      '1221',
      '2222',
      '2221',
      '2212',
      '1211',
      '2111',
      '2211',
      '2121',
      '2112',
    ]
    shuffle(card_dumps)
    for (let index = 0; index < 16; index++) {
      card_dumps[index] += index < 8 ? ':1' : ':2'
    }
    return card_dumps.join(' ')
  },
  bnw: () =>
    '1111:1 1112:1 1121:1 1211:1 2111:1 1122:1 1212:1 1221:1  2222:2 2221:2 2212:2 2122:2 1222:2 2211:2 2121:2 2112:2',
  extrem: () =>
    '1111:1 2222:1 1112:1 1121:1 1211:1 2221:1 2212:1 2122:1 1122:2 1212:2 2112:2 1221:2 2121:2 2211:2 2111:2 1222:2',
  symetric: () =>
    '1111:1 1112:1 1121:1 2122:1 1222:1 1122:1 1212:1 1221:1  2222:2 2221:2 2212:2 1211:2 2111:2 2211:2 2121:2 2112:2',
}

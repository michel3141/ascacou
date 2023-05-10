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
};

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const deal_methods = {
  get random() {
    return shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).slice(0, 8);
  },
  bnw: [0, 1, 2, 4, 8, 3, 5, 6],
  extrem: [0, 15, 1, 2, 4, 14, 13, 11],
  symetric: [0, 1, 2, 11, 7, 3, 5, 4],
};

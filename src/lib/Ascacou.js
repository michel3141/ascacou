import Square from './Square';
import Card from './Card';
import Inter from './Inter';

export default class Ascacou {
  constructor(prms) {
    this.prms = prms;

    this._cards = {};
    this._squares = {};
    this.inters = [];
    this.player = 1;
    this.last = [];
    this.evals = {};
    this.minmax = null;

    this.deal_cards()
    this.mk_squares()
  }

  get cards() {
    return Object.values(this._cards);
  }
  get squares() {
    return Object.values(this._squares);
  }
  static deal_methods = {
      random : {
        label : "Aléatoire",
        order : 1,
        deal : function() {
          function shuffle(a) {
              var j, x, i;
              for (i = a.length - 1; i > 0; i--) {
                  j = Math.floor(Math.random() * (i + 1));
                  x = a[i];
                  a[i] = a[j];
                  a[j] = x;
              }
              return a;
          }
          const card_dumps=[
          '1111', '1112', '1121', '2122', '1222', '1122', '1212', '1221',
          '2222', '2221', '2212', '1211', '2111', '2211', '2121', '2112',
          ];
          shuffle(card_dumps);
          for (let index = 0;index <16;index++) {
            card_dumps[index] += index <8 ? ':1' : ':2';
          }
          return card_dumps.join(' ');
        },
      },
      bnw    : {
        label : "Noirs et Blancs",
        order : 2,
        deal : function(){
          return (
            "1111:1 1112:1 1121:1 1211:1 2111:1 1122:1 1212:1 1221:1"
          + " 2222:2 2221:2 2212:2 2122:2 1222:2 2211:2 2121:2 2112:2"
          );
        },
      },
      extrem : {
        label : "Extrêmes et Médianes",
        order : 3,
        deal : function () {
          return (
            "1111:1 2222:1 1112:1 1121:1 1211:1 2221:1 2212:1 2122:1"
          + " 1122:2 1212:2 2112:2 1221:2 2121:2 2211:2 2111:2 1222:2"
          );
        },
      },
      symetric: {
        label : "Symétrique",
        order : 4,
        deal : function() {
          return (
            "1111:1 1112:1 1121:1 2122:1 1222:1 1122:1 1212:1 1221:1"
          + " 2222:2 2221:2 2212:2 1211:2 2111:2 2211:2 2121:2 2112:2"
          );
        },
      },
    };

  deal_cards() {
    const deal_method = this.prms.deal_method;
    const dump = Ascacou.deal_methods[deal_method].deal();
    return this.load_cards(dump);

  }

  dump_cards() {
    const dump = this.cards
      .map((c)=>c.dump())
      .join(" ");
    return dump;
  }

  load_cards(dump) {
    // die "On ne change pas les cartes après le début\n" if
    for (const card_dump of dump.split(' ')) {
      const card = Card.load(card_dump);
      this._cards[card.value] = card;
    }
    return this;
  }

  mk_squares() {
    let next = null;
    for (const line of [5,4,3,2,1]) {
      for (const row of [5,4,3,2,1]) {
        const coord = `${line}x${row}`;
        const square = new Square(
            coord,
            next,
            row == 5,
            );
        this._squares[coord] = square;
        next = square;
      }
    }

    const coords = [
        ['1x1',  '1x2',  '2x1',  '2x2'],
        ['1x2',  '1x3',  '2x2',  '2x3'],
        ['1x3',  '1x4',  '2x3',  '2x4'],
        ['1x4',  '1x5',  '2x4',  '2x5'],
        ['2x1',  '2x2',  '3x1',  '3x2'],
        ['2x2',  '2x3',  '3x2',  '3x3'],
        ['2x3',  '2x4',  '3x3',  '3x4'],
        ['2x4',  '2x5',  '3x4',  '3x5'],
        ['3x1',  '3x2',  '4x1',  '4x2'],
        ['3x2',  '3x3',  '4x2',  '4x3'],
        ['3x3',  '3x4',  '4x3',  '4x4'],
        ['3x4',  '3x5',  '4x4',  '4x5'],
        ['4x1',  '4x2',  '5x1',  '5x2'],
        ['4x2',  '4x3',  '5x2',  '5x3'],
        ['4x3',  '4x4',  '5x3',  '5x4'],
        ['4x4',  '4x5',  '5x4',  '5x5'],
    ];
    for (const coord of coords) {
      const squares = coord.map((c) => this._squares[c]);
      this.inters.push(new Inter(squares, this._cards, this.prms));
    }
    return this;
  }
  get_square (coord = '1x1') {
    // return unless $coord =~ /^[1-5]x[1-5]$/;
    return this._squares[coord];
  }

  play(move) {
    const [coord, content] = move.split(':');
    const square = this.get_square(coord);
    if (square.content != 0) {
      return null;
    }
    if (square.play(content)) {
      this.last.push(square);
      this.player = 3 - this.player;
      return true;
    } else {
      square.content = content + 'x';
      return false
    }
  }

  clear(move) {
    const [coord, content] = move.split(':');
    const square = this.get_square(coord);
    square.content = 0;
  }

  undo (){
    const square = this.last.pop();
    if (square) {
      square.play(0);
      this.player = 3 - this.player;
      return true;
    } else {
      return false;
    }
  }
}


import Square from './Square'
import Card from './Card'
import Inter from './Inter'

export default class Ascacou {
  constructor(prms) {
    this.prms = prms

    this._cards = {}
    this._squares = {}
    this.inters = []
    this.player = 1
    this.last = []
    this.evals = {}
    this.minmax = null

    this.deal_cards()
    this.mk_squares()
  }

  get cards() {
    return Object.values(this._cards)
  }

  get squares() {
    return Object.values(this._squares)
  }

  deal_cards() {
    const deal_method = this.prms.deal_method
    return []
    //const dump = Ascacou.deal_methods[deal_method].deal()
    //return this.load_cards(dump)
  }

  dump_cards() {
    const dump = this.cards.map(c => c.dump()).join(' ')
    return dump
  }

  fen() {
    const fen = []
    let square = this.get_square()
    let empty = 0
    let line = ''
    while (square) {
      const content = square.content
      if (content === 0) {
        empty += 1
      } else {
        if (empty > 0) {
          line += empty
          empty = 0
        }

        if (content === 1) {
          line += 'b'
        } else if (content === 2) {
          line += 'w'
        } else {
          line += content
        }
      }
      if (square.new_row) {
        if (empty > 0) {
          line += empty
          empty = 0
        }
        fen.push(line)
        line = ''
      }
      square = square.next
    }
    const board = fen.join('/')
    const cards = this.cards
      .filter(card => card.player === this.player)
      .map(card => card.fen())
      .sort()
    const my_cards = cards.join('')
    return [board, my_cards].join(' ')
  }

  load_cards(dump) {
    // die "On ne change pas les cartes après le début\n" if
    for (const card_dump of dump.split(' ')) {
      const card = Card.load(card_dump)
      this._cards[card.value] = card
    }
    return this
  }

  mk_squares() {
    let next = null
    for (const line of [5, 4, 3, 2, 1]) {
      for (const row of [5, 4, 3, 2, 1]) {
        const coord = `${line}x${row}`
        const square = new Square(coord, next, row === 5)
        this._squares[coord] = square
        next = square
      }
    }

    const coords = [
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
    ]
    for (const coord of coords) {
      const squares = coord.map(c => this._squares[c])
      this.inters.push(new Inter(squares, this._cards, this.prms))
    }
    return this
  }

  get_square(coord = '1x1') {
    // return unless $coord =~ /^[1-5]x[1-5]$/;
    return this._squares[coord]
  }

  play(move) {
    const { coord, content } = move
    const square = this.get_square(coord)
    if (square.content !== 0) {
      return null
    }
    if (square.play(content)) {
      this.last.push(square)
      this.player = 3 - this.player
      return true
    } else {
      square.content = content + 'x'
      return false
    }
  }

  clear(move) {
    const { coord } = move
    const square = this.get_square(coord)
    square.content = 0
  }

  undo() {
    const square = this.last.pop()
    if (square) {
      square.play(0)
      this.player = 3 - this.player
      return true
    } else {
      return false
    }
  }
}

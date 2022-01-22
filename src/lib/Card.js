export default class Card {
  constructor(value) {
    this.value = value
    this._done = false
    this._player = 0
  }

  clone() {
    const card = Card.load(this.dump())
    card.done = this.done
    return card
  }

  set player(player) {
    this._player = player
  }

  get player() {
    return this._player
  }

  set done(done) {
    if (done === false) {
      this._done--
    } else {
      this._done++
    }
  }

  get done() {
    return this._done > 0
  }

  dump() {
    return this.value + ':' + this.player
  }

  fen() {
    const translation = {
      1111: 'f',
      1112: '7',
      1121: 'b',
      1122: '3',
      1211: 'd',
      1212: '5',
      1221: '9',
      1222: '1',
      2111: 'e',
      2112: '6',
      2121: 'a',
      2122: '2',
      2211: 'c',
      2212: '4',
      2221: '8',
      2222: '0',
    }
    return translation[this.value]
  }

  static load(dump) {
    const [value, player] = dump.split(':')
    const card = new Card(value)
    card.player = player
    return card
  }
}

export default class Card {
  constructor(value) {
    this.value = value;
    this._done = false;
    this._player = 0;
  }

  clone() {
    const card = Card.load(this.dump());
    card.done = this.done;
    return card;
  }

  set player(player) {
    this._player = player;
  }

  get player() {
    return this._player;
  }

  set done(done) {
    if (done === false) {
      this._done--;
    } else {
      this._done++;
    }
  }

  get done() {
    return this._done > 0;
  }

  dump() {
    return this.value + ":" + this.player;
  }

  fen() {
    const translation = {
          "1111": 0,
          "1112": 1,
          "1121": 2,
          "1122": 3,
          "1211": 4,
          "1212": 5,
          "1221": 6,
          "1222": 7,
          "2111": 8,
          "2112": 9,
          "2121": 10,
          "2122": 11,
          "2211": 12,
          "2212": 13,
          "2221": 14,
          "2222": 15,
    }
    return translation[this.value]
  }

  static load(dump) {
    const [value, player] = dump.split(":");
    const card = new Card(value);
    card.player = player;
    return card;
  }
}

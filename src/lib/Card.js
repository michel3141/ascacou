export default class Card {
  constructor(value) {
    this.value = value;
    this._done = false;
    this._player = 0;
  }

  clone() {
    const card=Card.load(this.dump());
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

  static load(dump) {
    const [value, player] = dump.split(":");
    const card = new Card(value);
    card.player = player;
    return card;
  }
}

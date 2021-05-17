export default class Inter {
  constructor(squares, cards, prms={}) { 
    this.squares = squares;
    this.prms = prms;
    this.card = null;

    for (const square of squares) {
      square.add_inter(this);
    }

    this.get_card = function(value) {
      return cards[value];
    }
  }

  get value() {
    let value = '';
    for (const square of this.squares) {
      value += square.content;
    }
    return value;
  }

  get pattern() {
    let pattern = '';
    for (const square of this.squares) {
      pattern += square.pattern;
    }
    return pattern;
  }

  update() {
    if (this.card != null) {
      this.card.done = false;
      this.card = null
    }
    this.card = this.get_card(this.value);
    if (this.card != null) {
      if (this.prms.allow_multiple_cards || ! this.card.done) {
        this.card.done = true;
      } else {
        this.card = null;
        return false;
      }
    }
    return true;
  }
}


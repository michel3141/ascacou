export default class Ascacou {
  fen() {
    const fen = [];
    let square = this.get_square();
    let empty = 0;
    let line = '';
    while (square) {
      const content = square.content;
      if (content === 0) {
        empty += 1;
      } else {
        if (empty > 0) {
          line += empty;
          empty = 0;
        }

        if (content === 1) {
          line += 'b';
        } else if (content === 2) {
          line += 'w';
        } else {
          line += content;
        }
      }
      if (square.new_row) {
        if (empty > 0) {
          line += empty;
          empty = 0;
        }
        fen.push(line);
        line = '';
      }
      square = square.next;
    }
    const board = fen.join('/');
    const cards = this.cards
      .filter((card) => card.player === this.player)
      .map((card) => card.fen())
      .sort();
    const myCards = cards.join('');
    return [board, myCards].join(' ');
  }
}

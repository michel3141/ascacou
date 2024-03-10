import { GameResource } from './Api';
import defaultConnection from './Api/Connection';

/*
 * static s'applique au model
 * methods s'applique à la resource
 */
const sync = false;
const methods = {
  updateAttributes: function ({ params, cards, moves }, updateOpts) {
    // généralisation de updateAttributes ...
    // qui s'étend aux relationships
    // updateOpts peut avoir {isPersisted}
    // mais ne fonctionne pas bien pour moves ??
    // et pour le reste ??
    if (cards) {
      cards.forEach((attributes) => {
        const card = this.cards.find((x) => x.value === attributes.value);
        card?.updateAttributes(attributes, updateOpts);
      });
    }
    if (moves) {
      if (Array.isArray(moves) && moves.length === 0) {
        moves = { action: 'empty' };
      }
      if (Array.isArray(moves) && moves.length !== 0) {
        moves = { action: 'update', attributes: moves };
      }
      const { action, attributes } = moves;
      if (action === 'empty') {
        this.moves.forEach((move) => {
          move.isMarkedForDestruction = true;
          move.isMarkedForDisassociation = true;
        });
      }
      if (action === 'pop') {
        const move = this.moves.at(-1);
        if (move) move.isMarkedForDestruction = true;
      }
      if (action === 'push') {
        const Move = this.klass.typeRegistry._typeMap.moves;
        const rank = this.moves.length + 1;
        const move = new Move({ ...attributes, rank });
        this.moves.push(move);
      }
      if (action === 'update') {
        const Move = this.klass.typeRegistry._typeMap.moves;
        this.moves = attributes.map((attribute) => {
          const { id } = attribute;
          const move = new Move(attribute);
          move.updateAttributes({ id }, { isPersisted: true });
          return move;
        });
      }
    }
    if (params) {
      params.forEach((attributes) => {
        const param = this.params.find((x) => x.name === attributes.name);
        param?.updateAttributes(attributes, updateOpts);
      });
    }
    return this;
  },
};

export const GameEndpoint = (connection) => GameResource(connection, { static: { sync }, methods });

export default GameEndpoint(defaultConnection);

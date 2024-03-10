import rtk, { _, no_ } from 'rtk';

/*
 * constants
 */
import { name, gameInc, newDeal } from './constants';
import { FIRST, SECOND } from '~/features/players/constants';

/*
 * selectors
 */
import { selectGame } from './selectors';
import { selectEndpoints } from '~/features/connection/selectors';

/*
 * imports
 */

/* ************************ */

const { createActions, createThunks } = rtk(name);

const actions = createActions({
  disconnect: no_,
  playerIn: _,
  playerOut: _,
  undo: no_,
  reset: no_,
});

const mkGame = (game, endpoints) => {
  const {
    GameEndpoint,
    MoveEndpoint,
    CardEndpoint,
    ParamBooleanEndpoint,
    ParamStringEnumEndpoint,
    AppEndpoint,
  } = endpoints;

  const cards = game.cards.map((attributes) => new CardEndpoint(attributes));
  const moves = game.moves.map((attributes) => new MoveEndpoint(attributes));
  const params = game.params.map((attributes) =>
    attributes.dataType === 'BOOLEAN'
      ? new ParamBooleanEndpoint(attributes)
      : new ParamStringEnumEndpoint(attributes),
  );
  const app = new AppEndpoint(game.app);
  app.isPersisted = true; // l'app existe déjà

  return new GameEndpoint({ cards, moves, params, app });
};

const thunks = createThunks({
  create: (app, { getState, dispatch }) => {
    const { defaultParams: params } = app;

    const dealMethod = params.find((param) => param.name === 'deal_method').value;
    const cards = newDeal(dealMethod);

    const game = mkGame({ app, cards, params, moves: [] }, selectEndpoints(getState()));
    return game.commit({ with: gameInc });
  },

  find: async (id = '0', { getState, dispatch }) => {
    const { GameEndpoint } = selectEndpoints(getState());

    const game = (await GameEndpoint.includes(gameInc).find(id)).data;
    return game;
  },

  updateAttributes: async (attributes, { getState, dispatch }) => {
    // proche d'update
    // * vérifie que l'objet est le bon.
    // * ne déclenche pas de sauvegarde sur le serveur
    const currGame = selectGame(getState());
    if (!currGame || currGame.id !== attributes.id) {
      throw new Error("can't fetch game");
    }
    const { GameEndpoint } = selectEndpoints(getState());
    return (await GameEndpoint.includes(gameInc).find(attributes.id)).data;

    // original :
    // marchait bizarrement, en particulier quand l'update avait une liste de moves vide
    //  return currGame.updateAttributes(attributes, { isPersisted: true });
  },

  update: async (attributes, { dispatch, getState }) =>
    selectGame(getState()).updateAttributes(attributes).commit({
      with: gameInc,
    }),
  swapCards: (_, { dispatch, getState }) => {
    const { cards } = selectGame(getState());
    cards.forEach((card) => {
      switch (card.hand) {
        case FIRST:
          card.hand = SECOND;
          break;
        case SECOND:
          card.hand = FIRST;
          break;
      }
    });
    dispatch(update({ cards }));
  },
});

// RTK-AUTOEXPORT
// ---- actions ---------
export const { disconnect, playerIn, playerOut, undo, reset } = actions;
// ---- thunks ---------
export const { create, find, updateAttributes, update, swapCards } = thunks;

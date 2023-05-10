import rtk, { _, update } from '/lib/rtk'

import { deals } from '/app/constants/cards'

export const name = 'params'

const initialState = {
  allow_multiple_cards: {
    lbl: 'Autorise les motifs multiples',
    enable: false,
    type: 'boolean',
  },
  show_blocked: {
    lbl: 'Montre les cases bloquées',
    enable: true,
    type: 'boolean',
  },
  show_forbidden: {
    lbl: 'Montre les coups interdits',
    enable: true,
    type: 'boolean',
  },
  deal_method: {
    lbl: 'Type de distribution',
    enable: false,
    type: 'enum',
    values: deals,
  },
}

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState)

export const actions = createActions({
  updateValue: _,
  newGame: _,
})
export const selectors = createSelectors({
  show_blocked: state => state.params.show_blocked.value,
  show_forbidden: state => state.params.show_forbidden.value,
  allow_multiple_cards: state => state.params.allow_multiple_cards.value,
})

export default createReducer({
  [actions.updateValue]: (state, { payload }) => {
    for (const [key, value] of Object.entries(payload)) {
      if (key in state) {
        state[key].value = value
        // attention different de rtk.update :
        // state[key] = value
      }
    }
  },
  [actions.newGame]: update(),
})

export { listener }

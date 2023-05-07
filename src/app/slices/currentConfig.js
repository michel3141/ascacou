import rtk, { _ } from '/lib/rtk'

import Ascacou from '/lib/Ascacou'

export const name = 'currentConfig'

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
    values: Ascacou.deal_methods,
  },
}

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState)

export const actions = createActions({
  updateValue: _,
})
export const selectors = createSelectors({
  show_blocked: state => state.currentConfig.show_blocked.value,
  show_forbidden: state => state.currentConfig.show_forbidden.value,
  allowi_multiple_cards: state => state.currentConfig.allow_multiple_cards.value,
})

export default createReducer({
  [actions.updateValue]: (state, { payload }) => {
    for (const [key, value] of Object.entries(payload)) {
      if (key in state) {
        state[key].value = value
        // attention different de rtk.update :
        // statekey] = value
      }
    }
  },
})

export { listener }

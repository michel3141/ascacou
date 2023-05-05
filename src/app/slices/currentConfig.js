import rtk, { _ } from '/lib/rtk'

export const name = 'currentConfig'
// const name = module.id.replace(/(\/index)?\.jsx?/,'').replace(/.*\//,'')
/*
    {
      state: 'allow_multiple_cards',
      lbl: 'Autorise les motifs multiples',
      enable: false,
    },
    { state: 'show_blocked', lbl: 'Montre les cases bloquées', enable: true },
    {
      state: 'show_forbidden',
      lbl: 'Montre les coups interdits',
      enable: true,
    },
  */
const initialState = {
  allow_multiple_cards: {
    lbl: 'Autorise les motifs multiples',
    visible: true,
    enable: false,
    value: true,
    type: 'boolean',
  },
  show_blocked: {
    lbl: 'Montre les cases bloquées',
    enable: true,
    visible: true,
    value: false,
    type: 'boolean',
  },
  show_forbidden: {
    lbl: 'Montre les coups interdits',
    visible: true,
    enable: true,
    value: false,
    type: 'boolean',
  },
  deal_method: {
    lbl: 'Type de distribution',
    visible: false,
    enable: false,
    value: 'random',
    type: 'enum',
    enum: ['random'],
  },
}

const { createActions, createReducer, createSelectors, listener } = rtk(name, initialState)

export const actions = createActions({
  updateValue: _,
  updateItem: _,
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
      }
    }
  },
  [actions.updateItem]: (state, { payload }) => {
    const { key, item } = payload
    if (key in state) {
      state[key] = { ...item, value: state[key].value }
    }
  },
})

export { listener }

import { useSlice } from '/lib/react-redux'
// https://vitejs.dev/guide/features.html#glob-import
const modules = import.meta.glob(
  [
    './*/index.js',
    './*.js',
    '!./index.js',
    '../../features/*/*Slice.js',
    '../../features/*/*Slice/index.js',
  ],
  { eager: true }
)

const slices = Object.values(modules).reduce(
  (acc, module) => ({
    ...acc,
    [module.name]: module,
  }),
  {}
)

export const reducers = Object.entries(slices).reduce(
  (acc, [name, slice]) => ({
    ...acc,
    [name]: slice.default,
  }),
  {}
)

// !.mkexport
export const { theme, params, selector, board } = slices

export const useThemeSlice = () => useSlice(theme)
export const useParamsSlice = () => useSlice(params)
export const useSelectorSlice = () => useSlice(selector)
export const useBoardSlice = () => useSlice(board)

window.slices = slices

export default slices

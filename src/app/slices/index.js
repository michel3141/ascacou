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
export const { theme, currentConfig, selector } = slices

export const useThemeSlice = () => useSlice(theme)
export const useCurrentConfigSlice = () => useSlice(currentConfig)
export const useSelectorSlice = () => useSlice(selector)

window.slices = slices

export default slices

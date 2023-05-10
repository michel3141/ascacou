export const NOBODY = 0
export const FIRST = 1
export const SECOND = 2
// TODO playerSlice => on play
export const next = player => {
  switch (player) {
    case FIRST:
      return SECOND
    case SECOND:
      return FIRST
    default:
      return NOBODY
  }
}

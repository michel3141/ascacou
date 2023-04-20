import { useMemo, useRef, useCallback } from 'react'
const useLongPress = ({
  onClick = () => null,
  onLongPress = () => null,
  ms = 500,
} = {}) => {
  const timerRef = useRef(false)
  const eventRef = useRef({})

  const callback = useCallback(() => {
    onLongPress(eventRef.current)
    eventRef.current = {}
    timerRef.current = false
  }, [onLongPress])

  const start = useCallback(
    ev => {
      ev.persist()
      eventRef.current = ev
      timerRef.current = setTimeout(() => {
        timerRef.current = false
        eventRef.current = {}
        callback(ev)
      }, ms)
    },
    [callback, ms]
  )

  const stop = useCallback(ev => {
    ev.persist()
    eventRef.current = ev
    clearTimeout(timerRef.current)
    timerRef.current = false
    eventRef.current = {}
  }, [])

  const click = useCallback(
    ev => {
      if (timerRef.current) {
        onClick(ev)
        stop(ev)
      }
    },
    [onClick, stop]
  )

  return useMemo(
    () => ({
      onMouseDown: start,
      onMouseUp: click,
      onMouseLeave: stop,
      onTouchStart: start,
      onTouchEnd: click,
    }),
    [start, stop, click]
  )
}

export { useLongPress }

import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'

export const useSlice = slice => {
  const selections = {}
  for (const [name, selector] of Object.entries(slice.selectors || {})) {
    const hookName = name.replace('select', 'use')
    // FIXME eslint-disable-next-line react-hooks/rules-of-hooks
    selections[hookName] = () => useSelector(selector)
  }
  const dispatch = useDispatch()
  const dispatchs = useMemo(
    () => bindActionCreators(slice.actions || {}, dispatch),
    [dispatch, slice]
  )

  return { ...selections, ...dispatchs }
}

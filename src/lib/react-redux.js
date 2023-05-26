import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

export const useSlice = (slice) => {
  const selections = {};
  for (const [name, selector] of Object.entries(slice.selectors || {})) {
    const hookName = name.replace('select', 'use');
    /* eslint-disable react-hooks/rules-of-hooks */
    selections[hookName] = (params) =>
      useSelector(params === undefined ? selector : selector(params));
    /* eslint-enable react-hooks/rules-of-hooks */
  }
  const dispatch = useDispatch();
  const dispatchs = useMemo(
    () => bindActionCreators(slice.actions || {}, dispatch),
    [dispatch, slice],
  );

  return { ...selections, ...dispatchs };
};

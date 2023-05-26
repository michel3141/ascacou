import React from 'react';
import mkClasses from '/lib/mkClasses';
import './Square.scss';
import { useParamsSlice, useBoardSlice } from '/app/slices';

const Square = ({ coord }) => {
  const { useShowForbidden } = useParamsSlice();
  const { select, useSelected, useSquareByCoord } = useBoardSlice();
  const square = useSquareByCoord(coord);
  const showForbidden = useShowForbidden();
  const selected = useSelected();

  const { content, alert } = square;
  const className = mkClasses(
    'Square',
    `xy-${coord}`,
    `c-${alert && showForbidden ? alert : content}`,
    { Selected: selected?.coord === coord },
  );
  return (
    <div
      {...{ className }}
      onMouseDown={() => select(square)}
      onTouchStart={() => select(square)}
    ></div>
  );
};

export default Square;

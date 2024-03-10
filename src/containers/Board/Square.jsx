import React from 'react';
import mkClasses from '~/lib/mkClasses';
import './Square.scss';
import { constants, useGame } from '~/features/game';
import { useSelection } from '~/features/selection';
import { useApp } from '~/features/app';

const Square = ({ coord }) => {
  const { useSquareByCoord } = useGame();
  const { useSelected } = useSelection();
  const { selectCoord } = useApp();
  const square = useSquareByCoord(coord);
  const { coord: selectedCoord } = useSelected();

  if (!square) {
    return <div className={`Square xy-${coord} c-${constants.EMPTY} Loading`} />;
  } else {
    const { content, alert, blocked } = square;
    let cContent = content;
    if (alert) {
      cContent = content + 'x';
    }
    if (blocked) {
      cContent = constants.BLOCKED;
    }

    const className = mkClasses('Square', `xy-${coord}`, `c-${cContent}`, {
      Selected: selectedCoord === coord,
    });
    return (
      <div
        {...{ className }}
        onMouseDown={() => selectCoord(coord)}
      ></div>
    );
  }
};

export default Square;

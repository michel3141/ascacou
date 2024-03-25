/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
    return (
      <div className={`Square xy-${coord} c-${constants.EMPTY} Loading`} />
    );
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

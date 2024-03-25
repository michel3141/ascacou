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
import '../Board/Square.scss';

const Square = ({ coord, value, selectedCoord }) => {
  let content = 'EMPTY';
  let alert = false;
  switch (value) {
    case '1':
    case 'n':
      content = 'BLACK';
      break;
    case '2':
    case 'b':
      content = 'WHITE';
      break;
    case '3':
    case 'x':
    case 'X':
      content = 'BLOCKED';
      break;
    case '4':
    case 'N':
      content = 'BLACK';
      alert = true;
      break;
    case '5':
    case 'B':
      content = 'WHITE';
      alert = true;
      break;
  }
  if (alert) {
    content = content + 'x';
  }

  const className = mkClasses('Square', `xy-${coord}`, `c-${content}`, {
    Selected: selectedCoord === coord,
  });
  return <div {...{ className }}></div>;
};

export default Square;

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

import { Suspense, lazy } from 'react';
import '../Board/Board.scss';
const Square = lazy(() => import('./Square'));
// import Square from './Square';

const Board = ({ board }) => {
  const boardList = (board || '').replaceAll('/', '').split('').slice(0, 25);
  while (boardList.length < 25) {
    boardList.push('_');
  }

  // align='center'
  return (
    <div className='Board'>
      {/* import titre from '~assets/img/titre.png
      <img className="titre" src={titre}/> */}
      <Suspense fallback='...'>
        <table>
          <tbody>
            <tr>
              <td>
                <Square
                  coord='1x1'
                  value={boardList[0]}
                />
              </td>
              <td>
                <Square
                  coord='1x2'
                  value={boardList[1]}
                />
              </td>
              <td>
                <Square
                  coord='1x3'
                  value={boardList[2]}
                />
              </td>
              <td>
                <Square
                  coord='1x4'
                  value={boardList[3]}
                />
              </td>
              <td>
                <Square
                  coord='1x5'
                  value={boardList[4]}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Square
                  coord='2x1'
                  value={boardList[5]}
                />
              </td>
              <td>
                <Square
                  coord='2x2'
                  value={boardList[6]}
                />
              </td>
              <td>
                <Square
                  coord='2x3'
                  value={boardList[7]}
                />
              </td>
              <td>
                <Square
                  coord='2x4'
                  value={boardList[8]}
                />
              </td>
              <td>
                <Square
                  coord='2x5'
                  value={boardList[9]}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Square
                  coord='3x1'
                  value={boardList[10]}
                />
              </td>
              <td>
                <Square
                  coord='3x2'
                  value={boardList[11]}
                />
              </td>
              <td>
                <Square
                  coord='3x3'
                  value={boardList[12]}
                />
              </td>
              <td>
                <Square
                  coord='3x4'
                  value={boardList[13]}
                />
              </td>
              <td>
                <Square
                  coord='3x5'
                  value={boardList[14]}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Square
                  coord='4x1'
                  value={boardList[15]}
                />
              </td>
              <td>
                <Square
                  coord='4x2'
                  value={boardList[16]}
                />
              </td>
              <td>
                <Square
                  coord='4x3'
                  value={boardList[17]}
                />
              </td>
              <td>
                <Square
                  coord='4x4'
                  value={boardList[18]}
                />
              </td>
              <td>
                <Square
                  coord='4x5'
                  value={boardList[19]}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Square
                  coord='5x1'
                  value={boardList[20]}
                />
              </td>
              <td>
                <Square
                  coord='5x2'
                  value={boardList[21]}
                />
              </td>
              <td>
                <Square
                  coord='5x3'
                  value={boardList[22]}
                />
              </td>
              <td>
                <Square
                  coord='5x4'
                  value={boardList[23]}
                />
              </td>
              <td>
                <Square
                  coord='5x5'
                  value={boardList[24]}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Suspense>
    </div>
  );
};

export default Board;

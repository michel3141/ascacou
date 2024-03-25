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

import './Board.scss';
import Square from './Square';
// import Square from './Square';

const Board = () => (
  // align='center'
  <div className='Board'>
    {/* import titre from '~assets/img/titre.png
      <img className="titre" src={titre}/> */}
    <table>
      <tbody>
        <tr>
          <td>
            <Square coord='1x1' />
          </td>
          <td>
            <Square coord='1x2' />
          </td>
          <td>
            <Square coord='1x3' />
          </td>
          <td>
            <Square coord='1x4' />
          </td>
          <td>
            <Square coord='1x5' />
          </td>
        </tr>
        <tr>
          <td>
            <Square coord='2x1' />
          </td>
          <td>
            <Square coord='2x2' />
          </td>
          <td>
            <Square coord='2x3' />
          </td>
          <td>
            <Square coord='2x4' />
          </td>
          <td>
            <Square coord='2x5' />
          </td>
        </tr>
        <tr>
          <td>
            <Square coord='3x1' />
          </td>
          <td>
            <Square coord='3x2' />
          </td>
          <td>
            <Square coord='3x3' />
          </td>
          <td>
            <Square coord='3x4' />
          </td>
          <td>
            <Square coord='3x5' />
          </td>
        </tr>
        <tr>
          <td>
            <Square coord='4x1' />
          </td>
          <td>
            <Square coord='4x2' />
          </td>
          <td>
            <Square coord='4x3' />
          </td>
          <td>
            <Square coord='4x4' />
          </td>
          <td>
            <Square coord='4x5' />
          </td>
        </tr>
        <tr>
          <td>
            <Square coord='5x1' />
          </td>
          <td>
            <Square coord='5x2' />
          </td>
          <td>
            <Square coord='5x3' />
          </td>
          <td>
            <Square coord='5x4' />
          </td>
          <td>
            <Square coord='5x5' />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Board;

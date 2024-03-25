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

import { useState } from 'react';

import './AscacouEditor.scss';

import Board from './Board';
import Cards from './Cards';

const AscacouEditor = () => {
  const [board, setBoard] = useState('1112212122222112121111122');
  const [cards, setCards] = useState('0123456789abcdef');
  const [input, setInput] = useState(`${board} ${cards}`);
  return (
    <div className='AscacouEditor'>
      <input
        value={board}
        onChange={(e) => {
          const board = e.target.value;
          setInput(`${board} ${cards}`);
          setBoard(board);
        }}
      />
      <input
        value={cards}
        onChange={(e) => {
          const cards = e.target.value;
          setInput(`${board} ${cards}`);
          setCards(cards);
        }}
      />
      <input
        className='main'
        value={input}
        onChange={(e) => {
          const input = e.target.value;
          const [board, cards] = [input.split(' '), ''].flat();
          setInput(input);
          setBoard(board);
          setCards(cards);
        }}
      />
      <Board {...{ board }} />
      <Cards {...{ cards }} />
    </div>
  );
};

export default AscacouEditor;

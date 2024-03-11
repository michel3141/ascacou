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

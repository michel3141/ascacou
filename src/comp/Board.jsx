import React from 'react'
import Square from './Square'
import '/css/Board.css'

const Board = ({ squares, onMove, showBlocked, showForbidden }) => {
  // et ça remonte au jeu
  const move = (coord, content) => onMove(coord + ':' + content)
  let square = squares.find(square => square.coord === '1x1')
  const Squares = []
  let line = []
  while (square) {
    const { coord } = square
    line.push(
      <td key={square.coord}>
        <Square
          showBlocked={showBlocked}
          showForbidden={showForbidden}
          square={square}
          onSelect={() => move(coord)}
        />
      </td>
    )
    if (square.nl()) {
      Squares.push(<tr key={square.coord}>{line}</tr>)
      line = []
    }
    square = square.next
  }

  return (
    // align='center'
    <div className='Board'>
      {/* <img className="titre" src='img/titre.png'/> */}
      <table>
        <tbody>{Squares}</tbody>
      </table>
    </div>
  )
}

export default Board

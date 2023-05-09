import React from 'react'
import Square from './Square'
import '/css/Board.css'

const Board = ({}) => {
  return (
    // align='center'
    <div className='Board'>
      {/* <img className="titre" src='img/titre.png'/> */}
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
  )
}

export default Board

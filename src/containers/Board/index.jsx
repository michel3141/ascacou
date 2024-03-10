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

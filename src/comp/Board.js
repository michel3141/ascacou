import '/css/Board.css';
import Square from './Square';
import React, { Component} from "react";
export default class Board extends Component {

  static defaultProps = {
    onMove: function(){alert("onMove n'est pas défini")},
  }
  constructor (props) {
    super(props);
    /*
# squares //list
# onMove
*/
    this.move = this.move.bind(this);
  }

  move (coord, content) {
    // et ça remonte au jeu
    this.props.onMove(coord + ':' + content);
  }
  render() {
    const s = this.props.squares;
    let square;
    for (const sq of s) {
      if (sq.coord == '1x1') {
        square = sq;
        break;
      }
    }
    const squares = [];
    let line = [];
    while (square) {
      line.push(<td key={square.coord}>
        <Square 
          showBlocked={this.props.showBlocked}
          showForbidden={this.props.showForbidden}
          square={square}
          onSelect={this.move.bind(this, square.coord)}
        />
      </td>);
      if (square.nl()) {
        squares.push(<tr  key={square.coord} >{line}</tr>)
        line = [];
      }
      square = square.next;
    }
    return (
      <div className="Board" align="center">
        <img className="titre" src='img/titre.png'/>
        <table>
          <tbody>
            {squares}
          </tbody>
        </table>
      </div>
    )

  }

}

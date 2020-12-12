import React, { Component} from "react";
import '/css/Square.css';

export default class Square extends Component {
  constructor (props) {
    super(props);
    /* 
       square
       onSelect
       */
  }

  onMouseDown = (e) => {
    e.preventDefault(); // click
    this.timeout = setTimeout(()=>this.props.onSelect(2),1000);
  }
  onMouseUp = (e) => {
    e.preventDefault(); //  on ne sait jamais
    if (this.timeout) {
      this.props.onSelect(1);
      clearTimeout(this.timeout);
    }
    this.timeout = null;
  }
  onMouseLeave = (e) => {
    this.timeout && clearTimeout(this.timeout);
    this.timeout = null;
  }

  render() {
    const s = this.props.square;
    const content = s.content;
    let color = content;
    if (this.props.showBlocked 
        && s.playable().length == 0 ) color = content || 3;
    let className = 'Square';
    className += " xy-" + s.coord;
    className += " c-" + color;
    return <div className={className}
      onMouseDown={this.onMouseDown}
      onMouseUp={this.onMouseUp}
      onMouseLeave={this.onMouseLeave}
      onTouchStart={this.onMouseDown}
      onTouchEnd={this.onMouseUp}
      onTouchMove={this.onMouseLeave}
    >
    </div>
  }

}

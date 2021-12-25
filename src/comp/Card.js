import React, { Component } from "react";
import "/src/css/Card.css";

export default class Card extends Component {
  constructor(props) {
    /*
       card
       */
    super(props);
  }

  render() {
    const c = this.props.card;
    let className = "Card";
    className += " m-" + c.value;
    if (c.done) className += " done";
    return <div className={className} />;
  }
}

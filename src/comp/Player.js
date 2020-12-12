import '/css/Player.css';
import Card from './Card';
import React, { Component} from "react";

export default class Player extends Component {
  constructor (props) {
    super(props);
    /*
# id
# name
# cards
*/
  }

  render() {
    const c = this.props.cards;
    const {id, name, player} = this.props;
    const mon_tour = player == id;
    return (
        <div className="Player">
        <fieldset className={mon_tour ? 'mon-tour' : 'pas-mon-tour'}>
        <legend >[{name}]</legend>
          {
            c
              .filter((c) => c.player == id && !c.done)
              .map((c) => <Card key={c.value} card={c}/>)
          }
          </fieldset>
          <fieldset>
          {
            c
              .filter((c) => c.player == id && c.done)
              .map((c) => <Card key={c.value} card={c}/>)
          }
          </fieldset>
          </div>
        )
          
  }

}

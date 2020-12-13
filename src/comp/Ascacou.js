import React, { Component } from "react";
import {Grid} from '@material-ui/core';
import Player from './Player';
import Board from './Board';
import Menu from './Menu';
import Regles from './Regles';
import '/css/Ascacou.css';

export default class Ascacou extends Component {
  constructor(props) {
    /*
       prms
          allow_multiple_cards
          deal_method
          show_blocked
          show_forbidden
    */
    super(props);

    this.play=this.play.bind(this);
    this.actions = [
      {
        lbl: "Recommencer au début",
        cmd: "restart",
        enable: true,
        },
      {
        lbl: "Annuler le coup",
        cmd: "undo",
        enable: true,
        },
    ];

    this.state = {
      show_regles: false,
    }
  }

  play (move) {
    this.props.ascacou.play(move, this.forceUpdate.bind(this));
  }

  undo () {
    if (this.props.ascacou.undo()) this.forceUpdate();
  }
  restart () {
    while (this.props.ascacou.undo()) this.forceUpdate();
  }

  onAction = (cmd) => {
    if (cmd == 'undo') this.undo();
    if (cmd == 'restart') this.restart();
  }

  render() {
    const a = this.props.ascacou;
    return (<div className="Ascacou">
          <Menu
            actions={this.actions}
            onAction={this.onAction}
            drawer={{lbl:"Règles", action:<Regles/>, visible: this.state.show_regles}}
            onToggleDrawer={(v)=>this.setState({show_regles: v})}
          />
          <Grid 
            container
            direction="row"
            justify="space-evenly"
            alignItems="top"
          >
          <Grid item xs>
            <Player id="1" name="Joueur 1" cards={a.cards} player={a.player}/>
          </Grid>
          <Grid item xs>
            <Board 
              onMove={this.play} squares={a.squares} 
            showBlocked={this.props.prms.show_blocked}
            showForbidden={this.props.prms.show_forbidden}
            />
          </Grid>
          <Grid item xs>
            <Player id="2" name="Joueur 2" cards={a.cards} player={a.player}/>
          </Grid>
          </Grid>
          </div>
        );
  }

}

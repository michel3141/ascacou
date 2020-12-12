import React, { Component} from "react";
import {
  AppBar,
} from '@material-ui/core';

import Game from '/lib/Ascacou';
import "/css/App.css";

import Ascacou from './Ascacou';
import Config from './Config';
import Menu from './Menu';


class App extends Component{
  state = { 
    show_blocked: true,
    allow_multiple_cards: this.props.allow_multiple_cards,
    deal_method: this.props.deal_method,
    show_new_game: true
    };

  ascacou = new Game(this.state);


  onAction = (cmd) => {
    if (cmd == 'new') this.new_game();
    if (cmd == 'end') this.end_game();
  }

  new_game = (prms) => {
    this.ascacou = new Game(prms);
    prms.show_new_game=false;
    this.setState(prms);
    this.forceUpdate();
  }
  end_game () {
    this.ascacou = null;
    this.forceUpdate();
  }


  render() {
    return (
      <div className="App" >
        <AppBar position="static">
          <Menu
            actions={[ 
                {
                  lbl: "Nouvelle partie",
                  cmd: "new",
                  enable: false,
                  },
                {
                  lbl: "Arrêter",
                  cmd: "end",
                  enable: true,
                  },
            ]}
            onAction={this.onAction}
            titre="Ascacou"
            drawer={
              {
                lbl: "Nouvelle Partie",
                action: <Config 
                    prms={this.state}
                    onApply={this.new_game}
                    onCancel={()=>this.setState({show_new_game: false})}
                    appClass={Game}
               />,
                visible: this.state.show_new_game,
              }
            }
            onToggleDrawer={(v) => this.setState({show_new_game: v})}
          />
        </AppBar>
        { this.ascacou && <Ascacou 
             ascacou={this.ascacou}
             prms={{
                show_blocked: this.state.show_blocked,
            }}
       /> }
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Grid, AppBar } from "@mui/material";
import Game from "/src/lib/Ascacou";
import Player from "./Player";
import Board from "./Board";
import Selector from "./Selector";
import Menu from "./Menu";
import Regles from "./Regles";
import Config from "./Config";
import "/src/css/Ascacou.css";

import {
  SkipPrevious,
  Help,
  Replay,
  Menu as MenuIcn,
} from "@mui/icons-material";

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

    this.play = this.play.bind(this);
    this.actions = [
      {
        title: "Recommencer au début",
        lbl: <SkipPrevious />,
        cmd: "restart",
        enable: false,
      },
      {
        lbl: <Replay />,
        title: "Annuler le coup",
        cmd: "undo",
        long: "restart",
        enable: true,
      },
    ];

    this.state = {
      show_regles: false,
      show_new_game: true,
      currentColor: 1,
    };
  }

  play(move) {
    move += this.state.currentColor;
    const moved = this.props.ascacou.play(move);
    if (moved === null) return;
    if (moved) {
      this.forceUpdate();
    } else {
      if (this.props.prms.show_forbidden) {
        this.forceUpdate();
        setTimeout(() => {
          this.props.ascacou.clear(move);
          this.forceUpdate();
        }, 750);
      } else {
        this.props.ascacou.clear(move);
      }
    }
  }

  undo() {
    if (this.props.ascacou.undo()) this.forceUpdate();
  }
  restart() {
    while (this.props.ascacou.undo()) this.forceUpdate();
  }

  onAction = (cmd) => {
    if (cmd == "undo") this.undo();
    if (cmd == "restart") this.restart();
  };

  onNewGame = (prms) => {
    this.setState({ show_new_game: false });
    this.props.newGame(prms);
  };

  render() {
    const game = this.props.ascacou;
    return (
      <div className="Ascacou">
        <AppBar position="static" color="transparent">
          <Menu
            actions={this.actions}
            onAction={this.onAction}
            drawers={[
              {
                lbl: <Help />,
                title: "Règles",
                action: <Regles />,
                visible: this.state.show_regles,
                enable: true,
                onToggle: (v) => this.setState({ show_regles: v }),
              },
              {
                title: "Nouvelle partie",
                lbl: <MenuIcn />,
                action: (
                  <Config
                    prms={this.props.state}
                    onApply={this.onNewGame}
                    updateConfig={this.props.updateConfig}
                    appClass={Game}
                  />
                ),
                visible: this.state.show_new_game,
                enable: true,
                onToggle: (v) => this.setState({ show_new_game: v }),
              },
            ]}
            titre=<img
              src="img/titre-t.png"
              onMouseDown={(e) => e.preventDefault()}
            />
          />
        </AppBar>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item xs>
            <Player
              id="1"
              name="Joueur 1"
              cards={game.cards}
              player={game.player}
            />
          </Grid>
          <Grid item xs>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="space-evenly"
            >
              <Grid item xs>
                <Board
                  onMove={this.play}
                  squares={game.squares}
                  showBlocked={this.props.prms.show_blocked}
                  showForbidden={this.props.prms.show_forbidden}
                />
              </Grid>
              <Grid item xs>
                <Selector
                  onClick={(currentColor) => this.setState({ currentColor })}
                  current={this.state.currentColor}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Player
              id="2"
              name="Joueur 2"
              cards={game.cards}
              player={game.player}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

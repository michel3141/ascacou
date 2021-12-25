import React, { Component } from "react";
import {
  Grid,
  Button,
  Switch,
  List,
  ListItem,
  Typography,
  FormControlLabel,
  Divider,
} from "@mui/material";
import "/src/css/Config.css";

export default class Config extends Component {
  current = [
    {
      state: "allow_multiple_cards",
      lbl: "Autorise les motifs multiples",
      enable: false,
    },
    { state: "show_blocked", lbl: "Montre les cases bloquées", enable: true },
    {
      state: "show_forbidden",
      lbl: "Montre les coups interdits",
      enable: true,
    },
  ];
  switches = [
    {
      state: "allow_multiple_cards",
      lbl: "Autorise les motifs multiples",
      enable: true,
    },
    { state: "show_blocked", lbl: "Montre les cases bloquées", enable: true },
    {
      state: "show_forbidden",
      lbl: "Montre les coups interdits",
      enable: true,
    },
  ];
  state = {
    deal_method: this.props.prms.deal_method,
    allow_multiple_cards: this.props.prms.allow_multiple_cards,
    show_blocked: this.props.prms.show_blocked,
    show_forbidden: this.props.prms.show_forbidden,
  };

  onSelect(state_key, value) {
    this.setState({ [state_key]: value });
  }

  updateSwitches = (switches, value) => {
    switches.map((s) => {
      if (s.state == "show_blocked" || s.state == "show_forbidden") {
        s.enable = !value;
      }
    });
  };
  onSwitch(state_key, e) {
    const value = e.target.checked;
    this.setState({ [state_key]: value });
  }
  onSwitchCurrent(state_key, e) {
    const value = e.target.checked;
    this.props.updateConfig({ [state_key]: value });
  }

  onApply = () => {
    this.props.onApply(this.state);
  };

  render = () => {
    const dm = this.props.appClass.deal_methods;
    this.updateSwitches(this.switches, this.state.allow_multiple_cards);
    this.updateSwitches(this.current, this.props.prms.allow_multiple_cards);
    return (
      <div className="Config">
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
        >
          <p style={{ textAlign: "center" }}>
            <img src="img/icon_128.png" />
          </p>
          <Typography variant="h4">Partie en cours</Typography>
          {this.current.map((s) => {
            return (
              <div key={s.state}>
                <FormControlLabel
                  disabled={!s.enable}
                  value="start"
                  control={
                    <Switch
                      checked={this.props.prms[s.state]}
                      onClick={this.onSwitchCurrent.bind(this, s.state)}
                    />
                  }
                  label={s.lbl}
                  labelPlacement="start"
                />
              </div>
            );
          })}
          <Divider width="80%" />
          <Typography variant="h4">Nouvelle partie</Typography>
          {this.switches.map((s) => {
            const disabled = s.enable ? {} : { disabled: "disabled" };
            return (
              <div key={s.state}>
                <FormControlLabel
                  {...disabled}
                  value="start"
                  control={
                    <Switch
                      checked={this.state[s.state]}
                      onClick={this.onSwitch.bind(this, s.state)}
                    />
                  }
                  label={s.lbl}
                  labelPlacement="start"
                />
              </div>
            );
          })}
          <fieldset>
            <label>Type de distribution</label>
            <List>
              {Object.keys(dm).map((k) => (
                <ListItem
                  key={k}
                  button
                  onClick={this.onSelect.bind(this, "deal_method", k)}
                  selected={this.state.deal_method == k}
                >
                  {dm[k].label}
                </ListItem>
              ))}
            </List>
          </fieldset>

          {this.props
            .onCancel /*plus utilsé - Attention certainement un pb d'affichage*/ && (
            <Grid item>
              <Button color="secondary" onClick={this.props.onCancel}>
                Annuler
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.onApply}>
              Commencer
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };
}

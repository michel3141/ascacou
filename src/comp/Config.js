import React, { Component} from "react";
import {
  Grid,
  Button,
  Switch,
  List,
  ListItem,
  FormControlLabel,
} from '@material-ui/core';
import '/css/Config.css'

export default class Config extends Component {
  switches = [
    { state: 'allow_multiple_cards',
      lbl: "Autorise les motifs multiples",
      enable: true,
    },
    { state: 'show_blocked',
      lbl: "Montre les cases bloquées",
      enable: true,
    },
    { state: 'show_forbidden',
      lbl: "Montre les coups interdits",
      enable: true,
    },
  ];
  state = {
    deal_method : this.props.prms.deal_method,
    allow_multiple_cards : this.props.prms.allow_multiple_cards,
    show_blocked : this.props.prms.show_blocked,
    show_forbidden : this.props.prms.show_forbidden,
  }

  onSelect(state_key, value) {
    this.setState({[state_key]: value});
  }
  onSwitch(state_key, e) {
    this.setState({[state_key]: e.target.checked});
  }

  onApply = () => {
    this.props.onApply(this.state);
  }

  render = () => { 
    const dm = this.props.appClass.deal_methods;
    return (
      <div className="Config">
<p style={{textAlign:'center'}}><img src="img/icon_128.png" /></p>
        { this.switches.map((s) => ( s.enable &&
        <div key={s.state}>
          <FormControlLabel
              value="start"
              control={ <Switch 
                checked={this.state[s.state]}
                onClick={this.onSwitch.bind(this, s.state)}
                />}
              label={s.lbl}
              labelPlacement="start"
            />
        </div>
        ))}
        <fieldset>
          <label>Type de distribution</label>
       
                <List>
          {Object.keys(dm).map((k) =>
              <ListItem
                key={k}
                button
                onClick={this.onSelect.bind(this, 'deal_method', k)}
                selected={this.state.deal_method == k}
              >{dm[k].label}
              </ListItem>
              )}
          </List>
      </fieldset>
      <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >


          { this.props.onCancel && 
            <Grid item>
              <Button color="secondary" onClick={this.props.onCancel}>Annuler</Button>
            </Grid>
          }
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.onApply}>Commencer</Button>
          </Grid>
        </Grid>
      </div>
      )
  }
}

import React, { Component} from "react";
import {Grid} from '@material-ui/core';
import '/css/Selector.css';

export default class Card extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    const select1 = this.props.current == 1 ? 'Selected' : '';
    const select2 = this.props.current == 2 ? 'Selected' : '';
    return <div className="Selector">
      <Grid 
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        <Grid item xs>
          <div className={select1}
              onClick={()=>this.props.onClick(1)}
          >
            <img src="img/noirs.png"
            />
          </div>
        </Grid>
        <Grid item xs>
          <div className={select2}
              onClick={()=>this.props.onClick(2)}
          >
            <img src="img/blancs.png"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  }
}

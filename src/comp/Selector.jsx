import React, { Component } from "react";
import { Grid } from "@mui/material";
import "/css/Selector.css";

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const select1 = this.props.current == 1 ? "Selected" : "";
    const select2 = this.props.current == 2 ? "Selected" : "";
    return (
      <div className="Selector">
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item xs>
            <div className={select1} onMouseDown={() => this.props.onClick(1)}>
              <img
                src="img/noirs.png"
                onMouseDown={(e) => e.preventDefault()}
              />
            </div>
          </Grid>
          <Grid item xs>
            <div className={select2} onMouseDown={() => this.props.onClick(2)}>
              <img
                src="img/blancs.png"
                onMouseDown={(e) => e.preventDefault()}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

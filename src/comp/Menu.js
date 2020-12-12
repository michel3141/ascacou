import React, { Component} from "react";
import {
  Toolbar,
  Button,
  Typography,
  Drawer,
} from '@material-ui/core';

export default class Menu extends Component {

  constructor (props) {
    super(props);
    this.hideDrawer = this.hideDrawer.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
  }

  render() {
    const drawer = this.props.drawer;
    return (
        <Toolbar>
        { /*
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon 
          </IconButton>
          */}
          <Typography variant="h6" >
          {this.props.titre || ''}
          </Typography>
          { this.props.actions.map((a) => a.enable && 
            <Button 
              key={a.cmd}
              onClick={this.props.onAction.bind(this, a.cmd)} 
              color="inherit"
            >{a.lbl}</Button>
              )
          }
          {  drawer && <Button onClick={this.showDrawer} color="inherit">{drawer.lbl}</Button>}
          {  drawer && <Drawer anchor="right" open={drawer.visible} onClose={this.hideDrawer}>
            {drawer.action}
          </Drawer>
          }
        </Toolbar>
        )
  }

    hideDrawer(e) {
      this.props.onToggleDrawer && 
      this.props.onToggleDrawer(false);
    }
    showDrawer(e) {
      this.props.onToggleDrawer && 
      this.props.onToggleDrawer(true);
    }

}

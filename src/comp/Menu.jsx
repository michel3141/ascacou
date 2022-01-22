import React, { Component } from 'react'
import { Toolbar, IconButton, Typography, Drawer } from '@mui/material'

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.hideDrawer = this.hideDrawer.bind(this)
    this.showDrawer = this.showDrawer.bind(this)
  }
  handleButtonPress = action => {
    if (!action) return
    this.buttonPressTimer = setTimeout(() => this.props.onAction(action), 1500)
  }

  handleButtonRelease = () => {
    clearTimeout(this.buttonPressTimer)
  }

  render() {
    const drawers = this.props.drawers || []
    return (
      <Toolbar color='transparent'>
        {/*
          <IconIconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon 
          </IconIconButton>
          */}
        {this.props.actions.map(
          a =>
            a.enable && (
              <IconButton
                key={a.cmd}
                onClick={this.props.onAction.bind(this, a.cmd)}
                onTouchStart={this.handleButtonPress.bind(this, a.long)}
                onTouchEnd={this.handleButtonRelease}
                onMouseDown={this.handleButtonPress.bind(this, a.long)}
                onMouseUp={this.handleButtonRelease}
                onMouseLeave={this.handleButtonRelease}
                color='inherit'
                title={a.title}
              >
                {a.lbl}
              </IconButton>
            )
        )}
        <Typography variant='h2'>{this.props.titre || ''}</Typography>

        {drawers.map(
          (d, i) =>
            d.enable && (
              <IconButton
                key={i}
                style={i == 0 ? { marginLeft: 'auto' } : {}}
                onClick={e => this.showDrawer(e, d)}
                color='inherit'
                title={d.title}
              >
                {d.lbl}
              </IconButton>
            )
        )}

        {drawers.map(
          (d, i) =>
            d.enable && (
              <Drawer
                key={i}
                anchor='right'
                open={d.visible}
                onClose={e => this.hideDrawer(e, d)}
              >
                {d.action}
              </Drawer>
            )
        )}
      </Toolbar>
    )
  }

  hideDrawer(e, d) {
    d.onToggle && d.onToggle(false)
  }
  showDrawer(e, d) {
    d.onToggle && d.onToggle(true)
  }
}

import React, { Component } from 'react'

import Game from '/lib/Ascacou'
import '/css/App.css'

import Ascacou from './Ascacou'
import Menu from './Menu'

class App extends Component {
  state = {
    show_blocked: true,
    show_forbidden: true,
    allow_multiple_cards: this.props.allow_multiple_cards,
    deal_method: this.props.deal_method,
  }

  ascacou = new Game(this.state)

  onAction = cmd => {
    if (cmd == 'new') this.new_game()
    if (cmd == 'end') this.end_game()
  }

  new_game = prms => {
    this.ascacou = new Game(prms)
    prms.show_new_game = false
    this.setState(prms)
    this.forceUpdate()
  }
  end_game() {
    this.ascacou = null
    this.forceUpdate()
  }

  render() {
    return (
      <div className='App'>
        {this.ascacou && (
          <Ascacou
            state={this.state}
            ascacou={this.ascacou}
            newGame={this.new_game}
            updateConfig={s => this.setState(s)}
            prms={{
              show_blocked: this.state.show_blocked,
              show_forbidden: this.state.show_forbidden,
            }}
          />
        )}
        <div className='Square hidden' />
      </div>
    )
  }
}

export default App

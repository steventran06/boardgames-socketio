import React, { PureComponent } from 'react';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient("http://127.0.0.1:8080");

import './App.css';
import ConnectFour from './ConnectFour'

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      player: 1,
      winner: false,
      reset: false,
    };

    this.setScoreboard = this.setScoreboard.bind(this);
    this.triggerReset = this.triggerReset.bind(this);
  }

  componentDidMount() {
    socket.on("playerTurn", player => {
      this.setState({ player })
    });
  }

  setScoreboard({ winner, reset }) {
    this.setState({ winner, reset })
  }

  triggerReset() {
    this.setState({
      player: 1,
      reset: true,
      winner: false,
    });
  }

  render() {
    const { player, reset, winner } = this.state;
    return (
      <div className="App">
        <div className="scoreboard">
          <div className="scoreboard-text">
            <h1>Connect Four</h1>
            <h2>{winner ? `Player ${winner} is the winner!` : `Player ${player}'s turn`}</h2>
            {winner &&
              <button
                onClick={this.triggerReset}
              >
                Start Game
              </button>}
          </div>
        </div>
        <ConnectFour player={player} setScoreboard={this.setScoreboard} reset={reset} />
      </div>
    );
  }
}

export default App;

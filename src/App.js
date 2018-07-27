import React, { PureComponent } from 'react';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient("http://127.0.0.1:8080");

import './App.css';
import ConnectFour from './ConnectFour';
import CreateGame from './CreateGame';

class App extends PureComponent {
  constructor() {
    super();

    // check for url parameter for game
    const game = window.location.search.substr(1).split('=')[1];
    this.state = {
      hasGameParam: game,
      player: 1,
      winner: false,
      reset: false,
    };

    this.setScoreboard = this.setScoreboard.bind(this);
    this.triggerReset = this.triggerReset.bind(this);
  }

  componentDidMount() {
    socket.on('boardResponse', data => {
      this.setState({
        player: data.player
      });
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
    const { hasGameParam, player, reset, winner } = this.state;
    return (
      <div className="App">
        <div className="scoreboard">
          <div className="scoreboard-text">
          {hasGameParam ? (
            <div>
              <h1>Connect Four</h1>
              <h2>{winner ?
                `Player ${winner} is the winner!` :
                `Player ${player}'s turn`}
              </h2>
              {winner &&
                <button
                  onClick={this.triggerReset}
                >
                  Start Game
                </button>
              }
            </div>
            ) : (
              <h2>Create New Game</h2>
            )}
          </div>
        </div>
        {hasGameParam ? (
          <ConnectFour player={player} setScoreboard={this.setScoreboard} reset={reset} />
          ) : (
            <CreateGame />
          )
        }
      </div>
    );
  }
}

export default App;

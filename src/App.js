import React, { PureComponent } from 'react';
import socketIOClient from 'socket.io-client';

import './App.css';
import ConnectFour from './ConnectFour'

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      player: 1,
      winner: false,
      reset: false,
      response: false,
    };

    this.setScoreboard = this.setScoreboard.bind(this);
    this.triggerReset = this.triggerReset.bind(this);
  }

  componentDidMount() {
    const socket = socketIOClient("http://127.0.0.1:8080");
    socket.on("FromAPI", data => {
      console.log('data from api', data);
      this.setState({ response: data })
    });
  }

  setScoreboard({ player, winner, reset }) {
    this.setState({ player, winner, reset })
  }

  triggerReset() {
    this.setState({
      player: 1,
      reset: true,
      winner: false,
    })
  }

  render() {
    const { player, reset, response, winner } = this.state;
    return (
      <div className="App">
        {
          response ? <p>The temperature in Florence is: {response} °F</p>
          : <p>Loading...</p>
        }
        <div className="scoreboard">
          <div className="scoreboard-text">
            <h1>Connect Four</h1>
            <h2>{`Player ${player}'s ${winner ? 'the winner!' : 'turn'}`}</h2>
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

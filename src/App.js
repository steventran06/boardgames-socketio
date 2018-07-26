import React, { PureComponent } from 'react';
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
    const { player, reset, winner } = this.state;
    return (
      <div className="App">
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

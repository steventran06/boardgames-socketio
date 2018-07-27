import React, { PureComponent } from 'react';

import './App.css';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      gameName: '',
      disabled: false,
    };

    this.createNewGame = this.createNewGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  createNewGame(e) {
    e.preventDefault();
    this.setState({
      disabled: true,
    })
  }

  handleChange(e) {
    this.setState({
      gameName: e.target.value,
    });
  }

  render() {
    const { gameName, disabled } = this.state;
    const gameLink = `${window.location.href}?game=${gameName}`;
    return (
      <div>
        <form disabled={disabled} onSubmit={this.createNewGame}>
          <input
            disabled={disabled}
            onChange={this.handleChange}
            type="text"
            value={gameName}
          /><br /><br />
          <input
            disabled={disabled}
            type="submit"
            value="Submit"
          />
        </form>
        {disabled &&
          <div>
            <h2>Share link with friend and play!</h2>
            <a href={gameLink} target="_blank">
              {gameLink}
            </a>
          </div>
        }
      </div>
    );
  }
}

export default App;

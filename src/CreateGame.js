import React, { PureComponent } from 'react';

// material-ui
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
    const gameLink = `${window.location.href}?game=${gameName.replace(' ', '%20')}`;
    return (
      <Paper className="paper align-center">
        <form disabled={disabled} onSubmit={this.createNewGame}>
          <Typography variant="display1" color="inherit">
            Create New Game
          </Typography>
          <TextField
            disabled={disabled}
            error={gameName.length === 0}
            label="Room Name"
            placeholder="Enter Room Name"
            onChange={this.handleChange}
            margin="normal"
          /><br /><br />

          <Button
            disabled={disabled || gameName.length === 0}
            type="submit"
            variant="contained"
            color="primary"
          >
            Create A Room
          </Button>
        </form>
        {disabled &&
          <div>
            <h2>Share link with friend and play!</h2>
            <a href={gameLink} target="_blank">
              {gameLink}
            </a>
          </div>
        }
      </Paper>
    );
  }
}

export default App;

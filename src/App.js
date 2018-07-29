import React, { PureComponent } from 'react';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient("http://127.0.0.1:8080");

// material-ui
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './App.css';
import 'typeface-roboto'

import ConnectFour from './ConnectFour/ConnectFour';
import CreateGame from './CreateGame';
import Scoreboard from './Scoreboard';

const gamesAvailable = ['Connect Four'];

class App extends PureComponent {
  constructor() {
    super();

    // check for url parameter for game
    const game = window.location.search.substr(1).split('=')[1];
    this.state = {
      checked: true,
      hasGameParam: game,
      menuOpen: false,
      player: 1,
      reset: false,
      winner: false,
    };

    this.setScoreboard = this.setScoreboard.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
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

  toggleMenu() {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  }

  triggerReset() {
    this.setState({
      player: 1,
      reset: true,
      winner: false,
    });
  }

  render() {
    const { menuOpen, checked, hasGameParam, player, reset, winner } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              open={Boolean(menuOpen)}
              onClose={this.toggleMenu}
            >
              {gamesAvailable.map(game =>
                <MenuItem onClick={this.toggleMenu}>{game}</MenuItem>
              )}
            </Menu>
            <Typography variant="headline" color="inherit">
              Games and Stuff
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={2} />
          <Grid item xs={12} sm={8}>
            <Grid container spacing={8}>
              <Grid item xs={1} />
              <Grid item xs={10}>
                {hasGameParam &&
                  <Scoreboard
                    player={player}
                    triggerReset={this.triggerReset}
                    winner={winner}
                  />
                }
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={2} />
          <Grid item xs={12} sm={2} />
          <Grid item xs={12} sm={8}>
            <Grid container spacing={8}>
              <Grid item xs={1} sm={hasGameParam ? 0 : 2} />
              <Grid item xs={10} sm={hasGameParam ? 12: 8}>
                {hasGameParam ? (
                  <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                    <ConnectFour
                      player={player}
                      setScoreboard={this.setScoreboard}
                      reset={reset}
                    />
                  </Slide>
                  ) : (
                    <CreateGame />
                  )
                }
              </Grid>
              <Grid item xs={1} sm={hasGameParam ? 0 : 2} />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={2} />
        </Grid>
      </div>
    );
  }
}

export default App;

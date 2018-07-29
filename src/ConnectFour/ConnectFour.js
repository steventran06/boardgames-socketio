import React, { PureComponent } from 'react';
import socketIOClient from 'socket.io-client';

// material-ui
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Square from './Square';
import { emptyGameBoard } from '../helpers';

const socket = socketIOClient("http://127.0.0.1:8080");

class ConnectFour extends PureComponent {
  constructor() {
    super();
    this.state = {
      board: emptyGameBoard(6, 7),
    };

    this.checkWin = this.checkWin.bind(this);
    this.dropPiece = this.dropPiece.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset && !this.props.reset) {
      const emptyBoard = emptyGameBoard(6, 7);
      // emit to empty board for other player
      socket.emit('boardUpdate', {
        player: 2,
        board: emptyBoard,
      });
      this.setState({
        board: emptyBoard,
      })
    }
  }

  componentDidMount() {
    socket.on('boardResponse', data => {
      this.setState({
        board: data.board
      });
    });
  }

  // checks for win from last piece dropped
  checkWin(row, col, player) {
    const { board } = this.state;
    // check for vertical win
    let vertCount = 1;
    while (board[row + vertCount] &&
      board[row + vertCount][col] === player) {
      vertCount++;
    }
    if (vertCount >= 4) {
      return player;
    }
    
    // check for horizontal win
    // check left to see if there are same pieces
    let horizStart = 0;
    while (board[row][col + horizStart - 1] &&
      board[row][col + horizStart - 1] === player) {
      horizStart--;
    }
    // check to the right and count
    let horizCount = 1;
    while (board[row][col + horizStart + horizCount] === player) {
      horizCount++;
    }
    if (horizCount >= 4) {
      return player;
    }

    // check for minor diagonal win
    // check row - 1 and col - 1 to see if there are the same pieces
    let minorStart = 0;
    while (board[row - minorStart - 1] &&
      board[row - minorStart - 1][col - minorStart - 1] === player) {
      minorStart++;
    }
    // check to the right and down one and count
    let minorCount = 1;
    while (board[row - minorStart + minorCount] &&
      board[row - minorStart + minorCount][col - minorStart + minorCount] === player) {
      minorCount++;
    }
    if (minorCount >= 4) {
      return player;
    }

    // check for major diagonal win
    // check row + 1 and col - 1 to see if there are the same pieces
    let majorStart = 0;
    while (board[row + majorStart + 1] &&
      board[row + majorStart + 1][col - majorStart - 1] === player) {
      majorStart++;
    }
    // check to the right and up one and count
    let majorCount = 1;
    while (board[row + majorStart - majorCount] &&
      board[row + majorStart - majorCount][col - majorStart + majorCount] === player) {
      majorCount++;
    }
    if (majorCount >= 4) {
      return player;
    }
    return false;
  }

  dropPiece(col) {
    const { player, setScoreboard } = this.props;
    const { board } = this.state;
    let row = 0;
    // don't do switch player or drop
    // piece if column is filled
    if (board[row][col] === 0) {
      // iterate from top to see if we are
      // able to move down to drop piece
      while (board[row + 1] && board[row + 1][col] === 0) {
        row++;
      }

      // set square on the board
      // to the player value
      const newBoard = board;
      newBoard[row][col] = player;

      // check for a win
      const winner = this.checkWin(row, col, player);
      setScoreboard({
        winner,
        reset: false
      })
      // emit current player and board change
      socket.emit("boardUpdate", {
        player,
        board: newBoard,
      });
    }
  }

  render() {
    const { board } = this.state;
    return (
      <Paper className="paper align-center">
        <Grid container spacing={8}>
          {board.map((row, i) =>
            <Grid item xs={12} className="connect-four-row">
              <Grid container spacing={8}>
                {row.map((value, i) =>
                  <Square
                    key={`col${i}`}
                    col={i}
                    value={value}
                    dropPiece={this.dropPiece}
                  />)
                }
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    );
  }
}

export default ConnectFour;

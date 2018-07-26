import React, { PureComponent } from 'react';
import './App.css';
import Row from './Row';

class ConnectFour extends PureComponent {
  constructor() {
    super();
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ]
    };

    this.checkWin = this.checkWin.bind(this);
    this.dropPiece = this.dropPiece.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.reset, this.props.reset)
    if (nextProps.reset && !this.props.reset) {
      this.setState({
        board: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ]
      });
    }
  }

  checkWin(row, col, player) {
    const { board } = this.state;
    // check for vertical win
    let vertCount = 1;
    while (board[row + vertCount] && board[row + vertCount][col] === player) {
      vertCount++;
    }
    if (vertCount >= 4) {
      return true;
    }
    
    // check for horizontal win
    // check left to see if there are same pieces
    let horizStart = 0;
    while (board[row][col + horizStart - 1] && board[row][col + horizStart - 1] === player) {
      horizStart--;
    }
    // check to the right and count
    let horizCount = 1;
    while (board[row][col + horizStart + horizCount] === player) {
      horizCount++;
    }
    if (horizCount >= 4) {
      return true;
    }

    // check for minor diagonal win
    // check row - 1 and col - 1 to see if there are the same pieces
    let minorStart = 0;
    while (board[row - minorStart - 1] && board[row - minorStart - 1][col - minorStart - 1] === player) {
      minorStart++;
    }
    // check to the right and down one and count
    let minorCount = 1;
    while (board[row - minorStart + minorCount] && board[row - minorStart + minorCount][col - minorStart + minorCount] === player) {
      minorCount++;
    }
    if (minorCount >= 4) {
      return true;
    }

    // check for major diagonal win
    // check row + 1 and col - 1 to see if there are the same pieces
    let majorStart = 0;
    while (board[row + majorStart + 1] && board[row + majorStart + 1][col - majorStart - 1] === player) {
      majorStart++;
    }
    // check to the right and up one and count
    let majorCount = 1;
    while (board[row + majorStart - majorCount] && board[row + majorStart - majorCount][col - majorStart + majorCount] === player) {
      majorCount++;
    }
    if (majorCount >= 4) {
      return true;
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
      // set state for new board and switch players
      this.setState({
        board: newBoard,
      });

      const winner = this.checkWin(row, col, player);
      setScoreboard({
        player: player === 2 ? 1 : 2,
        winner,
        reset: false
      })
    }
  }

  render() {
    const { board } = this.state;
    return (
      <div className="connect-four">
        {board.map((row, i) =>
          <Row
            key={`row${i}`}
            row={i}
            arr={row}
            dropPiece={this.dropPiece}
          />)
        }
      </div>
    );
  }
}

export default ConnectFour;

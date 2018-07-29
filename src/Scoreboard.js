import React from 'react';

// material-ui
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Scoreboard = ({ player, triggerReset, winner }) => (
  <Paper className="paper align-center">
    <Typography variant="display1" color="inherit">
      Connect Four
    </Typography>
    <Typography variant="headline" color="inherit">
      {winner ?
        `Player ${winner} is the winner!` :
        `Player ${player}'s turn`
      }
    </Typography>
    {winner &&
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={triggerReset}
      >
        Start Game
      </Button>
    }
  </Paper>
);

export default Scoreboard;

import React from 'react';

// material-ui
import Grid from '@material-ui/core/Grid';

const Square = ({ dropPiece, value, col }) => {
  let color = '';
  if (value === 1) color = 'red';
  if (value === 2) color = 'black';
  return(
    <Grid
      xs
      onClick={() => dropPiece(col)}
      className={`square ${color}`}
    />
  );
}

export default Square;

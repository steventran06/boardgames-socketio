import React from 'react';
import './App.css';

const Square = ({ dropPiece, value, col }) => {
  let color = '';
  if (value === 1) color = 'red';
  if (value === 2) color = 'black';
  return(
    <div
      onClick={() => dropPiece(col)}
      className={`square ${color}`}
    />
  );
}

export default Square;

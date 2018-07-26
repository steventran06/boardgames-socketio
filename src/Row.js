import React from 'react';
import './App.css';
import Square from './Square';

const Row = ({ dropPiece, row, arr }) => (
  <div className="row">
    {arr.map((value, i) =>
      <Square
        key={`col${i}`}
        col={i}
        value={value}
        dropPiece={dropPiece}
      />)}
  </div>
);

export default Row;

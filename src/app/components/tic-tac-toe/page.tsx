"use client"; // Add this line to make it a Client Component

import { useState } from 'react';
import styles from './tic-tac-toe.module.css';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(index: number) {
    const newBoard = board.slice();
    if (winner || newBoard[index]) return; 
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className={styles.container}>
      <h1>Play Tic-Tac-Toe</h1>
      <div className={styles.status}>{status}</div>
      <div className={styles.board}>
        {board.map((cell, index) => (
          <button key={index} className={styles.cell} onClick={() => handleClick(index)}>
            {cell}
          </button>
        ))}
      </div>
      <button className={styles.resetButton} onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

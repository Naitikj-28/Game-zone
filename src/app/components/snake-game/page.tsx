// "use client";

// import React, { useEffect, useState } from "react";
// import styles from "./snake-game.module.css";

// const SnakeGame = () => {
//   const [snake, setSnake] = useState<number[][]>([[0, 0]]);
//   const [food, setFood] = useState<number[]>([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
//   const [direction, setDirection] = useState<string>("RIGHT");
//   const [speed, setSpeed] = useState<number>(200);
//   const [isGameOver, setIsGameOver] = useState<boolean>(false);
//   const [score, setScore] = useState<number>(0);

//   const boardSize = 20;

//   const moveSnake = () => {
//     const head = snake[0];
//     const newHead = [...head];

//     switch (direction) {
//       case "UP":
//         newHead[1] -= 1;
//         break;
//       case "DOWN":
//         newHead[1] += 1;
//         break;
//       case "LEFT":
//         newHead[0] -= 1;
//         break;
//       case "RIGHT":
//         newHead[0] += 1;
//         break;
//       default:
//         break;
//     }

//     if (newHead[1] < 0) {
//       newHead[1] = boardSize - 1;
//     } else if (newHead[1] >= boardSize) {
//       newHead[1] = 0;
//     }

//     if (newHead[0] < 0) {
//       newHead[0] = boardSize - 1;
//     } else if (newHead[0] >= boardSize) {
//       newHead[0] = 0;
//     }

//     const newSnake = [newHead, ...snake];

//     if (newHead[0] === food[0] && newHead[1] === food[1]) {
//       setFood([Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)]);
//       setScore((prevScore) => prevScore + 1);
//       setSpeed((prevSpeed) => Math.max(100, prevSpeed - 10));
//     } else {
//       newSnake.pop();
//     }

//     if (
//       newSnake.slice(1).some((segment) => segment[0] === newHead[0] && segment[1] === newHead[1])
//     ) {
//       setIsGameOver(true);
//       return;
//     }

//     setSnake(newSnake);
//   };

//   useEffect(() => {
//     if (isGameOver) return;

//     const interval = setInterval(() => {
//       moveSnake();
//     }, speed);

//     return () => clearInterval(interval);
//   }, [snake, direction, isGameOver, speed]);

//   const handleKeyDown = (e: KeyboardEvent) => {
//     switch (e.key) {
//       case "ArrowUp":
//         if (direction !== "DOWN") setDirection("UP");
//         break;
//       case "ArrowDown":
//         if (direction !== "UP") setDirection("DOWN");
//         break;
//       case "ArrowLeft":
//         if (direction !== "RIGHT") setDirection("LEFT");
//         break;
//       case "ArrowRight":
//         if (direction !== "LEFT") setDirection("RIGHT");
//         break;
//       default:
//         break;
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [direction]);

//   const resetGame = () => {
//     setSnake([[0, 0]]);
//     setFood([Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)]);
//     setDirection("RIGHT");
//     setSpeed(200);
//     setIsGameOver(false);
//     setScore(0);
//   };

//   return (
//     <div className={styles.total}>
//       <div className={styles.gameContainer}>
//         <h1 className={styles.title}>Snake Game</h1>
//         <div className={styles.board}>
//           {Array.from({ length: boardSize }, (_, row) => (
//             <div key={row} className={styles.row}>
//               {Array.from({ length: boardSize }, (_, col) => {
//                 const isSnakeHead = snake[0][0] === col && snake[0][1] === row;
//                 const isSnakeBody = snake.slice(1).some(([x, y]) => x === col && y === row);
//                 const isFood = food[0] === col && food[1] === row;
//                 return (
//                   <div
//                     key={`${row}-${col}`}
//                     className={`${styles.cell} ${isSnakeHead ? styles.snakeHead : ""} ${isSnakeBody ? styles.snake : ""} ${isFood ? styles.food : ""}`}
//                   ></div>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//         <div className={styles.score}>Score: {score}</div>
//         {isGameOver && (
//             <button className={styles.resetGame} onClick={resetGame}>Play Again</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SnakeGame;
"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./snake-game.module.css";

const SnakeGame = () => {
  const [snake, setSnake] = useState<number[][]>([[0, 0]]);
  const [food, setFood] = useState<number[]>([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
  const [direction, setDirection] = useState<string>("RIGHT");
  const [speed, setSpeed] = useState<number>(200);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const boardSize = 20;

  const moveSnake = useCallback(() => {
    if (isGameOver) return;
    
    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = [...head];

      switch (direction) {
        case "UP":
          newHead[1] -= 1;
          break;
        case "DOWN":
          newHead[1] += 1;
          break;
        case "LEFT":
          newHead[0] -= 1;
          break;
        case "RIGHT":
          newHead[0] += 1;
          break;
      }

      newHead[1] = (newHead[1] + boardSize) % boardSize;
      newHead[0] = (newHead[0] + boardSize) % boardSize;

      const newSnake = [newHead, ...prevSnake];

      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setFood([Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)]);
        setScore((prev) => prev + 1);
        setSpeed((prev) => Math.max(100, prev - 10));
      } else {
        newSnake.pop();
      }

      if (newSnake.slice(1).some(([x, y]) => x === newHead[0] && y === newHead[1])) {
        setIsGameOver(true);
        return prevSnake;
      }

      return newSnake;
    });
  }, [direction, food, isGameOver]);

  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [moveSnake, speed, isGameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setDirection((prev) => {
        if (e.key === "ArrowUp" && prev !== "DOWN") return "UP";
        if (e.key === "ArrowDown" && prev !== "UP") return "DOWN";
        if (e.key === "ArrowLeft" && prev !== "RIGHT") return "LEFT";
        if (e.key === "ArrowRight" && prev !== "LEFT") return "RIGHT";
        return prev;
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const resetGame = () => {
    setSnake([[0, 0]]);
    setFood([Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)]);
    setDirection("RIGHT");
    setSpeed(200);
    setIsGameOver(false);
    setScore(0);
  };

  return (
    <div className={styles.total}>
      <div className={styles.gameContainer}>
        <h1 className={styles.title}>Snake Game</h1>
        <div className={styles.board}>
          {Array.from({ length: boardSize }, (_, row) => (
            <div key={row} className={styles.row}>
              {Array.from({ length: boardSize }, (_, col) => {
                const isSnakeHead = snake[0][0] === col && snake[0][1] === row;
                const isSnakeBody = snake.slice(1).some(([x, y]) => x === col && y === row);
                const isFood = food[0] === col && food[1] === row;
                return (
                  <div
                    key={`${row}-${col}`}
                    className={`${styles.cell} ${isSnakeHead ? styles.snakeHead : ""} ${isSnakeBody ? styles.snake : ""} ${isFood ? styles.food : ""}`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
        <div className={styles.score}>Score: {score}</div>
        {isGameOver && <button className={styles.resetGame} onClick={resetGame}>Play Again</button>}
      </div>
    </div>
  );
};

export default SnakeGame;

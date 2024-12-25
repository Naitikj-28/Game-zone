"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./ping-pong.module.css";

const PingPong = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const paddleHeight = 150;
  const paddleWidth = 25;
  const ballRadius = 20;
  const canvasWidth = 1000;
  const canvasHeight = 700;

  const ballX = useRef(canvasWidth / 2);
  const ballY = useRef(canvasHeight / 2);
  const ballDX = useRef(4);
  const ballDY = useRef(4);
  const paddle1Y = useRef(canvasHeight / 2 - paddleHeight / 2);
  const paddle2Y = useRef(canvasHeight / 2 - paddleHeight / 2);
  const upPressed = useRef(false);
  const downPressed = useRef(false);

  const maxScore = 10;

  let animationFrameId = useRef<number | null>(null); 

  const drawPaddle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
  };

  const drawBall = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(ballX.current, ballY.current, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  };

  const drawNet = (ctx: CanvasRenderingContext2D) => {
    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = "white";
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.stroke();
  };

  const movePaddles = () => {
    if (!isPaused) {
      if (upPressed.current && paddle1Y.current > 0) paddle1Y.current -= 8;
      if (downPressed.current && paddle1Y.current < canvasHeight - paddleHeight) paddle1Y.current += 8;

      const aiSpeed = 3.5;
      const paddleCenter = paddle2Y.current + paddleHeight / 2;

      if (paddleCenter < ballY.current - 35) paddle2Y.current += aiSpeed;
      else if (paddleCenter > ballY.current + 35) paddle2Y.current -= aiSpeed;
    }
  };

  const moveBall = () => {
    if (!isPaused) {
      ballX.current += ballDX.current;
      ballY.current += ballDY.current;

      if (ballY.current + ballRadius > canvasHeight || ballY.current - ballRadius < 0) {
        ballDY.current = -ballDY.current;
      }

      if (
        ballX.current - ballRadius <= paddleWidth &&
        ballY.current >= paddle1Y.current &&
        ballY.current <= paddle1Y.current + paddleHeight
      ) {
        ballDX.current = -ballDX.current;
      }

      else if (
        ballX.current + ballRadius >= canvasWidth - paddleWidth &&
        ballY.current >= paddle2Y.current &&
        ballY.current <= paddle2Y.current + paddleHeight
      ) {
        ballDX.current = -ballDX.current;
      }

      else if (ballX.current - ballRadius < 0) {
        setPlayer2Score((score) => {
          if (score + 1 >= maxScore) {
            setGameOver(true);
          }
          return score + 1;
        });
        resetBall();
      }

      else if (ballX.current + ballRadius > canvasWidth) {
        setPlayer1Score((score) => {
          if (score + 1 >= maxScore) {
            setGameOver(true);
          }
          return score + 1;
        });
        resetBall();
      }
    }
  };

  const resetBall = () => {
    ballX.current = canvasWidth / 2;
    ballY.current = canvasHeight / 2;
    ballDX.current = -ballDX.current;
  };

  const startNewGame = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);
    resetBall();
    cancelAnimationFrame(animationFrameId.current!); 
    gameLoop();
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const gameLoop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!isPaused && ctx && gameStarted && !gameOver) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawPaddle(ctx, 0, paddle1Y.current); 
      drawPaddle(ctx, canvasWidth - paddleWidth, paddle2Y.current); 
      drawBall(ctx); 
      drawNet(ctx); 

      movePaddles();
      moveBall();
    }

    animationFrameId.current = requestAnimationFrame(gameLoop); 
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") upPressed.current = true;
      if (e.key === "ArrowDown") downPressed.current = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") upPressed.current = false;
      if (e.key === "ArrowDown") downPressed.current = false;
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    if (gameStarted && !isPaused) {
      cancelAnimationFrame(animationFrameId.current!); 
      gameLoop();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameId.current!); 
    };
  }, [gameStarted, isPaused, gameOver]);

  return (
    <div className={styles.gameContainer}>
      <h1 className={styles.title}>Ping Pong</h1>
      {!gameStarted && !gameOver && (
        <button className={styles.startButton} onClick={startNewGame}>
          Start New Game
        </button>
      )}
      {gameStarted && (
        <>
          <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className={styles.canvas}></canvas>
          <div className={styles.score}>
            <p>Player 1: {player1Score}</p>
            <p>Player 2: {player2Score}</p>
          </div>
          <div className={styles.controls}>
            <button className={styles.pauseButton} onClick={togglePause}>
              {isPaused ? "Resume" : "Pause"}
            </button>
          </div>
        </>
      )}
      {gameOver && (
        <div className={styles.gameOver}>
          <h2>{player1Score >= maxScore ? "Player 1 Wins!" : "Player 2 Wins!"}</h2>
          <button className={styles.startButton} onClick={startNewGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default PingPong;

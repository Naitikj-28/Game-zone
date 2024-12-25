"use client"; // Add this line to make it a Client Component

import { useState, useEffect } from 'react';
import styles from './rock-paper-scissors.module.css';

const choices = [
    { name: 'Rock', emoji: '✊'},
    { name: 'Paper', emoji: '🖐' },
    { name: 'Scissors', emoji: '✌' }
];

export default function RockPaperScissors() {
    const [userChoice, setUserChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [result, setResult] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [countdown, setCountdown] = useState(3); 

    const handleUserChoice = (choice: string) => {
        setUserChoice(choice);
        const computerRandomChoice = choices[Math.floor(Math.random() * choices.length)].name;
        setComputerChoice(computerRandomChoice);
        determineWinner(choice, computerRandomChoice);
        setShowResult(false); 
        setTimeout(() => {
            setShowResult(true); 
        }, 400); 
    };

    const determineWinner = (user: string, computer: string) => {
        if (user === computer) {
            setResult("It's a tie!");
        } else if (
            (user === 'Rock' && computer === 'Scissors') ||
            (user === 'Paper' && computer === 'Rock') ||
            (user === 'Scissors' && computer === 'Paper')
        ) {
            setResult('You win!');
        } else {
            setResult('Computer wins!');
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0 && showResult) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 3000);
        } else if (countdown === 0) {
            resetGame();
            setCountdown(3); 
        }

        return () => clearInterval(timer); 
    }, [countdown, showResult]);

    const resetGame = () => {
        setUserChoice('');
        setComputerChoice('');
        setResult('');
        setShowResult(false); 
    };

    return (
        <div className={styles.total}>
        <div className={styles.container}>
            <h1 className={styles.hh1}>Rock-Paper-Scissors</h1>
            <div className={styles.choices}>
                {choices.map((choice) => (
                    <button
                        key={choice.name}
                        onClick={() => handleUserChoice(choice.name)}
                        className={styles.choiceButton}
                    >
                        <span className={styles.emoji}>{choice.emoji}</span>
                    </button>
                ))}
            </div>
            {userChoice && showResult && (
                <div className={styles.results}>
                    <h2>Your choice: {userChoice}</h2>
                    <h2>Computer's choice: {computerChoice}</h2>
                    <h2>{result}</h2>
                </div>
            )}
            {showResult && countdown > 0 && (
                <h2 className={styles.countdown}>Next game in 00:0{countdown}</h2>
            )}
        </div>
        </div>
    );
}

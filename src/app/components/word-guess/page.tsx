"use client"; 

import { useState, useEffect } from 'react';
import styles from './word-guess.module.css';

const wordList = [
    { word: 'apple', hint: 'A fruit that keeps doctors away.' },
    { word: 'banana', hint: 'A yellow fruit often found in bunches.' },
    { word: 'orange', hint: 'A citrus fruit known for its vitamin C.' },
    { word: 'grape', hint: 'A small fruit that grows in bunches, often used for wine.' },
    { word: 'mango', hint: 'A tropical fruit, also the king of fruits.' },
    { word: 'carrot', hint: 'A vegetable that helps improve vision.' },
    { word: 'cucumber', hint: 'A long green vegetable, often used in salads.' },
    { word: 'potato', hint: 'A vegetable used to make fries.' },
    { word: 'tomato', hint: 'A fruit often mistaken for a vegetable, used in sauces.' },
    { word: 'onion', hint: 'A vegetable that can make you cry when cutting.' },
    { word: 'paris', hint: 'A city known as the "City of Light".' },
    { word: 'london', hint: 'A city famous for the Big Ben and the Tower Bridge.' },
    { word: 'tokyo', hint: 'The capital city of Japan.' },
    { word: 'delhi', hint: 'The capital city of India.' },
    { word: 'mumbai', hint: 'The largest city in India, known for Bollywood.' },
    { word: 'gujarat', hint: 'The capital city of cotton, and food' },
    { word: 'tesla', hint: 'An electric car company founded by Elon Musk.' },
    { word: 'audi', hint: 'A German luxury car brand with four rings as its logo.' },
    { word: 'bmw', hint: 'A luxury car brand known for its drifting and beautiful eyes.' },
    { word: 'ford', hint: 'An American car brand, known for the Mustang.' },
    { word: 'toyota', hint: 'A Japanese car brand known for reliability.' },
    { word: 'honda', hint: 'A Japanese car brand, known for its motorcycles and cars.' }
];

const qwertyKeyboard = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm'
];

export default function WordGuessGame() {
    const [selectedWord, setSelectedWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [maxWrongGuesses, setMaxWrongGuesses] = useState(20);
    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [hint, setHint] = useState('');
    const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started

    useEffect(() => {
        if (gameStarted) {
            const randomIndex = Math.floor(Math.random() * wordList.length);
            const randomWord = wordList[randomIndex].word;
            const randomHint = wordList[randomIndex].hint;

            setSelectedWord(randomWord);
            setHint(randomHint);
            setGuessedLetters([]); 
            setWrongGuesses(0); 
            setGameStatus('playing'); 
        }
    }, [gameStarted]);

    const handleGuess = (letter: string) => {
        if (guessedLetters.includes(letter) || gameStatus !== 'playing') return;

        setGuessedLetters((prev) => [...prev, letter]);

        if (!selectedWord.includes(letter)) {
            setWrongGuesses((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (gameStatus === 'playing') {
            const allLettersGuessed = selectedWord.split('').every((letter) => guessedLetters.includes(letter));

            if (allLettersGuessed) {
                setGameStatus('won');
            } else if (wrongGuesses >= maxWrongGuesses) {
                setGameStatus('lost');
            }
        }
    }, [guessedLetters, wrongGuesses, selectedWord, gameStatus]);

    const resetGame = () => {
        setGuessedLetters([]);
        setWrongGuesses(0);
        setGameStatus('playing');
    };

    const displayWord = selectedWord
        .split('')
        .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');

    return (
        <div className={styles.container}>
            <div className={styles.contain}>
                <h1 className={styles.title}>Word Guess </h1>
                {!gameStarted && (
                    <button onClick={() => setGameStarted(true)} className={styles.startButton}>Start Game</button>
                )}
                {gameStarted && (
                    <>
                        <div className={styles.hint}>Hint: {hint}</div>
                        <div>
                            <div className={styles.word}>{displayWord}</div>
                            <div className={styles.letters}>
                                {qwertyKeyboard.map((letter) => (
                                    <button
                                        key={letter}
                                        onClick={() => handleGuess(letter)}
                                        disabled={guessedLetters.includes(letter) || gameStatus !== 'playing'}
                                        className={styles.letterButton}
                                    >
                                        {letter}
                                    </button>
                                ))}
                            </div>
                            <div className={styles.status}>Wrong Guesses: {wrongGuesses}/{maxWrongGuesses}</div>
                        </div>
                        {gameStatus === 'won' && (
                            <div className={styles.winMessage}>
                                <h2>You've Won!</h2>
                                <button onClick={() => {
                                    setGameStarted(false);
                                    resetGame();
                                }} className={styles.resetButton}>Play Again</button>
                            </div>
                        )}
                        {gameStatus === 'lost' && (
                            <div className={styles.lostMessage}>
                                <h2>You Lost! The word was: {selectedWord}</h2>
                                <button onClick={() => {
                                    setGameStarted(false);
                                    resetGame();
                                }} className={styles.resetButton}>Play Again</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

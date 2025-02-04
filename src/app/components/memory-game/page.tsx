"use client"; 

import { useState, useEffect } from 'react';
import styles from './memory-game.module.css';

const emojiSets = [
    ['🤴', '😀', '😆', '🤣', '😍', '🤑', '🥵', '🥶'],  // Set 1
    ['👻', '👽', '🎃', '🧠', '🐱‍👤', '🤖', '👾', '🦄']   // Set 2
];

const shuffleCards = (cards: string[]) => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
};

export default function MemoryGame() {
    const [cards, setCards] = useState<string[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [lock, setLock] = useState(false);

    useEffect(() => {
        const selectedSet = emojiSets[Math.floor(Math.random() * emojiSets.length)]; 
        const pairedEmojis = [...selectedSet, ...selectedSet]; 
        const shuffledCards = shuffleCards(pairedEmojis);
        setCards(shuffledCards);
    }, []);

    const handleCardClick = (index: number) => {
        if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedIndices.includes(index)) {
            setFlippedIndices((prev) => [...prev, index]);
        }
    };

    useEffect(() => {
        if (flippedIndices.length === 2) {
            const [firstIndex, secondIndex] = flippedIndices;
            setLock(true);

            if (cards[firstIndex] === cards[secondIndex]) {
                setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
            }
            setMoves((prev) => prev + 1);

            setTimeout(() => {
                setFlippedIndices([]);
                setLock(false);
            }, 1000);
        }
    }, [flippedIndices, cards]);

    const resetGame = () => {
        const selectedSet = emojiSets[Math.floor(Math.random() * emojiSets.length)];
        const pairedEmojis = [...selectedSet, ...selectedSet];
        const shuffledCards = shuffleCards(pairedEmojis);
        setCards(shuffledCards);
        setFlippedIndices([]);
        setMatchedIndices([]);
        setMoves(0);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Memory Game</h1>
            <div className={styles.moves}>Moves: {moves}</div>
            <div className={styles.board}>
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`${styles.card} ${flippedIndices.includes(index) || matchedIndices.includes(index) ? styles.flipped : ''}`}
                        onClick={() => !lock && handleCardClick(index)}
                    >
                        <div className={styles.cardContent}>
                            {flippedIndices.includes(index) || matchedIndices.includes(index) ? card : '❓'}
                        </div>
                    </div>
                ))}
            </div>
            {matchedIndices.length === cards.length && (
                <div className={styles.winMessage}>
                    <h2>You&apos;ve matched all pairs!</h2>
                    <button className={styles.resetButton} onClick={resetGame}>Play Again</button>
                </div>
            )}
        </div>
    );
}


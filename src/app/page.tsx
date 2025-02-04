import Link from "next/link";
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Games Station</h1>
      <ul className={styles.list}>
        <li className={styles['list-item']}><Link href="/components/tic-tac-toe">Tic-Tac-Toe</Link></li>
        <li className={styles['list-item']}><Link href="/components/rock-paper-scissors">Rock-Paper-Scissors</Link></li>
        <li className={styles['list-item']}><Link href="/components/memory-game">Memory Game</Link></li>
        <li className={styles['list-item']}><Link href="/components/joke-generator">Jokes</Link></li>
        <li className={styles['list-item']}><Link href="/components/ping-pong">Ping Pong</Link></li>
        <li className={styles['list-item']}><Link href="/components/snake-game">Snake & Food</Link></li>
      </ul>
    </div>
  );
}

import Link from "next/link";
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Games Station</h1>
      <ul className={styles.list}>
        <li className={styles['list-item']}>
          <Link href="/components/tic-tac-toe" className={styles['full-link']}>
            Tic-Tac-Toe
          </Link>
        </li>
        <li className={styles['list-item']}>
          <Link href="/components/rock-paper-scissors" className={styles['full-link']}>
            Rock-Paper-Scissors
          </Link>
        </li>
        <li className={styles['list-item']}>
          <Link href="/components/memory-game" className={styles['full-link']}>
            Memory Game
          </Link>
        </li>
        <li className={styles['list-item']}>
          <Link href="/components/joke-generator" className={styles['full-link']}>
            Jokes
          </Link>
        </li>
        <li className={styles['list-item']}>
          <Link href="/components/ping-pong" className={styles['full-link']}>
            Ping Pong
          </Link>
        </li>
        <li className={styles['list-item']}>
          <Link href="/components/snake-game" className={styles['full-link']}>
            Snake & Food
          </Link>
        </li>
      </ul>
    </div>
  );
}

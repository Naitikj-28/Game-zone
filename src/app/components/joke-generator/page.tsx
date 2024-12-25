// "use client"; // Add this line to make it a Client Component

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './joke-generator.module.css';

// const JokeGenerator = () => {
//   const [joke, setJoke] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchJoke = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
//       const jokeData = response.data;
//       if (jokeData.type === 'single') {
//         setJoke(jokeData.joke);
//       } else {
//         setJoke(`${jokeData.setup} ... ${jokeData.delivery}`);
//       }
//       setLoading(false);
//     } catch (error) {
//       setJoke('Failed to fetch a joke. Please try again.');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJoke();
//   }, []);

//   return (
//     <div className={styles.jokeContainer}>
//       <h1 className={styles.title}>Joke Generator</h1>
//       {loading ? <p>Loading...</p> : <p className={styles.joke}>{joke}</p>}
//       <button onClick={fetchJoke} className={styles.jokeButton}>
//         Get Another Joke
//       </button>
//     </div>
//   );
// };

// export default JokeGenerator;
"use client"; // Add this line to make it a Client Component

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './joke-generator.module.css';

const JokeGenerator = () => {
  const [joke, setJoke] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
      const jokeData = response.data;
      if (jokeData.type === 'single') {
        setJoke(jokeData.joke);
      } else {
        setJoke(`${jokeData.setup} ... ${jokeData.delivery}`);
      }
      setLoading(false);
    } catch (error) {
      setJoke('Failed to fetch a joke. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className={styles.jokeContainer}>
      <h1 className={styles.title}>Joke Generator</h1>
      {loading ? <p className={styles.loading}>Loading...</p> : <p className={styles.joke}>{joke}</p>}
      <button onClick={fetchJoke} className={styles.jokeButton}>
        Get Another Joke
      </button>
    </div>
  );
};

export default JokeGenerator;

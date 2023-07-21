import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [randomWord, setRandomWord] = useState('');
  const [userPun, setUserPun] = useState('');
  const [aiPun, setAiPun] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [timer, setTimer] = useState(30);

  const wordArray = ['fruit', 'house', 'hospital', 'school', 'cars'];

  useEffect(() => {
    let countdown;
    if (gameStarted && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [gameStarted, timer]);

  const generateRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const word = wordArray[randomIndex];
    setRandomWord(word);
  };

  const generateAiPun = async (word) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: 'start_game' },
            { role: 'system', content: 'generate_pun' },
            { role: 'user', content: word },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
        }
      );

      const aiPun = response.data.choices[0].message.content.trim();
      setAiPun(aiPun);
    } catch (error) {
      console.error('Error generating AI pun:', error);
    }
  };

  const handleSubmit = () => {
    setUserSubmissions([...userSubmissions, userPun]);
    generateAiPun(randomWord);
    setUserPun('');
  };

  const handleStartGame = () => {
    generateRandomWord();
    setGameStarted(true);
  };

  return (
    <div className="page-container">
      <div className="ai-container">
        <div className="ai-response-container">
          <h4 className="pun-text">Computer: {aiPun}</h4>
        </div>
      </div>
      <div className="middle-container">
        <div className="scoreboard-container">
        <h2 className="score-text">Score: 0</h2>
        </div>
        <div className="word-generator-container">
          {!gameStarted ? (
            <button className="start-game-button" onClick={handleStartGame}>
              Start Game
            </button>
          ) : (
            <h2 className="pun-text">Word: {randomWord}</h2>
          )}
        </div>
        <div className="timer-container">
          <h2 className="timer-text">Timer: {timer}</h2>
        </div>
      </div>
      <div className="user-input-container">
        <div className="user-submissions">
          {userSubmissions.map((submission, index) => (
            <p key={index} className="pun-text">
              {submission}
            </p>
          ))}
        </div>
        <input
          type="text"
          value={userPun}
          onChange={(e) => setUserPun(e.target.value)}
          placeholder="Enter Your Pun"
        />
        <button className="submitButton" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Home;













  /*const generateRandomWord = async () => {
    try {
      const response = await axios.get('https://random-word-api.herokuapp.com/word');
      const word = response.data[0];
      setRandomWord(word);
    } catch (error) {
      console.log('Error generating random word:', error);
    }
  };*/
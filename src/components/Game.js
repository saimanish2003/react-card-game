import React, { useState, useEffect } from "react";
import Card from "./Card";

const photos = [
  "https://i.pinimg.com/564x/98/8e/6e/988e6ecabc6330f9c95a0ba9807422f5.jpg",
  "https://i.pinimg.com/control/236x/4f/3f/b6/4f3fb69c50bb57b744457a62c94ef8f6.jpg",
  "https://i.pinimg.com/236x/7e/54/6c/7e546c29c4f6a0365269ee0a6886b10f.jpg",
  "https://i.pinimg.com/236x/44/5d/bb/445dbb6d66ea990018b85d1f9c31b941.jpg",
  "https://i.pinimg.com/236x/7d/97/6d/7d976db9ea897e6b695ac09077abf797.jpg",
  "https://i.pinimg.com/236x/92/8a/c2/928ac2a9c94bb2e8c7be8a305b3461b6.jpg",
  "https://i.pinimg.com/236x/2a/1a/56/2a1a56ce07444b8887701a051d46cef3.jpg",
  "https://i.pinimg.com/564x/71/8b/59/718b59e24a46dfa426a74b0aa36dfcbe.jpg"
];

const Cards = () => {
  const card = [...photos, ...photos]; 
  return card.sort(() => Math.random() - 0.5); 
};

function Game() {
  const [cards, setCards] = useState(Cards());
  const [flip, setFlip] = useState([]);
  const [match, setMatch] = useState([]);
  const [disable, setDisable] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(
    parseInt(localStorage.getItem("bestScore")) || null
  );

  useEffect(() => {
    let interval = null;
    if (!gameOver) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameOver]);

  const flipCard = (index) => {
    if (disable || match.includes(index)) return;
    if (flip.length === 1) {
      setFlip([...flip, index]);
    } else {
      setFlip([index]);
    }
  };

  useEffect(() => {
    if (flip.length === 2) {
      const [first, second] = flip;
      if (cards[first] === cards[second]) {
        setMatch((prev) => [...prev, first, second]);
        setFlip([]);
      } else {
        setDisable(true);
        setTimeout(() => {
          setFlip([]);
          setDisable(false);
        }, 1000);
      }
    }
  }, [flip, cards]);

  useEffect(() => {
    if (match.length === cards.length) {
      setGameOver(true);


      if (bestScore === null || timer < bestScore) {
        setBestScore(timer);
        localStorage.setItem("bestScore", timer);
      }
    }
  }, [match, cards, timer, bestScore]);

  const resetGame = () => {
    setCards(Cards());
    setFlip([]);
    setMatch([]);
    setDisable(false);
    setTimer(0);
    setGameOver(false);
  };

  return (
    <div>
      <h1>Memory Game</h1>
      <h2>Time: {timer} seconds</h2>
      {bestScore !== null && <h2>Best Score: {bestScore} seconds</h2>}
      {gameOver ? (
        <div>
          <h2>Congratulations! You won!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div className="game-board">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              flip={flip.includes(index) || match.includes(index)}
              match={match.includes(index)}
              onClick={() => flipCard(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Game;

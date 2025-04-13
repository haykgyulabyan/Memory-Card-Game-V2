import { useState, useEffect } from 'react';
import Controls from '../Controls';
import Board from '../Board';
import GameOver from '../GameOver';
import { GameContainer } from './Game.styles';

const cardImports = import.meta.glob('../../assets/cards/[2-9TJQKA][HDCS].svg', { eager: true });
const CARDS = Object.keys(cardImports).map((path) => ({
  id: path.split('/').pop().replace('.svg', ''),
  src: cardImports[path].default,
}));

const DIFFICULTIES = {
  easy: { rows: 4, cols: 4, pairs: 8 },
  medium: { rows: 6, cols: 6, pairs: 18 },
  hard: { rows: 8, cols: 8, pairs: 32 },
};

function Game() {
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const initializeGame = (diff) => {
    const { pairs } = DIFFICULTIES[diff];
    const shuffledCards = CARDS.sort(() => Math.random() - 0.5).slice(0, pairs);
    const cardPairs = [...shuffledCards, ...shuffledCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ id: index, contentId: card.id, src: card.src }));
    setCards(cardPairs);
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
    setStartTime(Date.now());
    setEndTime(null);
  };

  const handleCardClick = (id) => {
    if (flipped.length === 2 || matched.includes(id) || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts(attempts + 1);
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].contentId === cards[secondId].contentId) {
        setMatched([...matched, firstId, secondId]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          setEndTime(Date.now());
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const changeDifficulty = (newDiff) => {
    if (newDiff === difficulty) return;
    if (startTime && !endTime) {
      const confirmReset = window.confirm('Changing difficulty will reset your game progress. Are you sure?');
      if (!confirmReset) return;
    }
    setDifficulty(newDiff);
  };

  const playAgain = () => {
    initializeGame(difficulty);
  };

  const duration = endTime ? ((endTime - startTime) / 1000).toFixed(1) : 0;
  const accuracy = attempts > 0 ? ((matched.length / 2 / attempts) * 100).toFixed(1) : 0;

  useEffect(() => {
    initializeGame(difficulty);
  }, [difficulty]);

  return (
    <GameContainer>
      <Controls changeDifficulty={changeDifficulty} />
      <Board
        cards={cards}
        flipped={flipped}
        matched={matched}
        onCardClick={handleCardClick}
        rows={DIFFICULTIES[difficulty].rows}
        cols={DIFFICULTIES[difficulty].cols}
      />
      {endTime && <GameOver duration={duration} attempts={attempts} accuracy={accuracy} onPlayAgain={playAgain} />}
    </GameContainer>
  );
}

export default Game;

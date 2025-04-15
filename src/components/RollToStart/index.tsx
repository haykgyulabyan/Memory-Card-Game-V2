import { useState, useEffect } from 'react';
import { useGameStore } from 'store/useGameStore';
import { RollContainer, RollButton, CoinAnimation, RollResultText } from './RollToStart.styles';

function RollToStart() {
  const player1Name = useGameStore((state) => state.player1Name);
  const player2Name = useGameStore((state) => state.player2Name);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const rollToStart = useGameStore((state) => state.rollToStart);
  const [isRolling, setIsRolling] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    setShowResult(false);

    setTimeout(() => {
      rollToStart();
    }, 1500);
  };

  useEffect(() => {
    let timer: number;
    if (isRolling && currentPlayer !== null) {
      timer = setTimeout(() => {
        setShowResult(true);
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [currentPlayer, isRolling]);

  const winnerName = currentPlayer === 1 ? player1Name : player2Name;

  return (
    <RollContainer>
      <h2>Who Goes First?</h2>
      <p>
        {player1Name} vs {player2Name}
      </p>

      {!isRolling && !showResult && <RollButton onClick={handleRoll}>Roll to Start</RollButton>}

      {isRolling && !showResult && <CoinAnimation>🪙</CoinAnimation>}

      {showResult && currentPlayer !== null && <RollResultText>{winnerName} starts!</RollResultText>}
    </RollContainer>
  );
}

export default RollToStart;

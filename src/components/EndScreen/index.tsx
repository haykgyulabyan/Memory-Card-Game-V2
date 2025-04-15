import { useGameStore } from 'store/useGameStore';
import { formatDuration } from 'utils/timeFormatter';
import { EndScreenContainer, WinnerMessage, FinalStats, PlayerStats, PlayAgainButton } from './EndScreen.styles';

function EndScreen() {
  const player1Name = useGameStore((state) => state.player1Name);
  const player2Name = useGameStore((state) => state.player2Name);
  const player1Score = useGameStore((state) => state.player1Score);
  const player2Score = useGameStore((state) => state.player2Score);
  const player1Attempts = useGameStore((state) => state.player1Attempts);
  const player2Attempts = useGameStore((state) => state.player2Attempts);
  const player1Time = useGameStore((state) => state.player1TimeElapsed);
  const player2Time = useGameStore((state) => state.player2TimeElapsed);
  const resetGame = useGameStore((state) => state.resetGame);

  let winnerText;
  let winnerClass = '';
  if (player1Score > player2Score) {
    winnerText = `${player1Name} wins!`;
  } else if (player2Score > player1Score) {
    winnerText = `${player2Name} wins!`;
  } else {
    winnerText = "It's a tie!";
    winnerClass = 'tie';
  }

  const calcAccuracy = (score: number, attempts: number): string => {
    if (attempts === 0) return '0.0';
    return ((score / attempts) * 100).toFixed(1);
  };
  const player1Accuracy = calcAccuracy(player1Score, player1Attempts);
  const player2Accuracy = calcAccuracy(player2Score, player2Attempts);

  return (
    <EndScreenContainer>
      <h2>Game Over!</h2>
      <WinnerMessage className={winnerClass}>{winnerText}</WinnerMessage>

      <FinalStats>
        <PlayerStats>
          <h4>{player1Name}</h4>
          <p>
            Score: <span>{player1Score}</span>
          </p>
          <p>
            Attempts: <span>{player1Attempts}</span>
          </p>
          <p>
            Accuracy: <span>{player1Accuracy}%</span>
          </p>
          <p>
            Time Played: <span>{formatDuration(player1Time)}</span>
          </p>
        </PlayerStats>
        <PlayerStats>
          <h4>{player2Name}</h4>
          <p>
            Score: <span>{player2Score}</span>
          </p>
          <p>
            Attempts: <span>{player2Attempts}</span>
          </p>
          <p>
            Accuracy: <span>{player2Accuracy}%</span>
          </p>
          <p>
            Time Played: <span>{formatDuration(player2Time)}</span>
          </p>
        </PlayerStats>
      </FinalStats>

      <PlayAgainButton onClick={resetGame}>Play Again?</PlayAgainButton>
    </EndScreenContainer>
  );
}

export default EndScreen;

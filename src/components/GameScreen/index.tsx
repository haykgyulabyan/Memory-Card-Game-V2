import { useGameStore } from 'store/useGameStore';
import Board from 'components/Board';
import { GameScreenContainer, GameInfo, PlayerInfo, TurnIndicator } from './GameScreen.styles';

const player1HighlightColor = '#007bff';
const player2HighlightColor = '#ffc107';

function GameScreen() {
  const player1Name = useGameStore((state) => state.player1Name);
  const player2Name = useGameStore((state) => state.player2Name);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const player1Score = useGameStore((state) => state.player1Score);
  const player2Score = useGameStore((state) => state.player2Score);
  const player1Attempts = useGameStore((state) => state.player1Attempts);
  const player2Attempts = useGameStore((state) => state.player2Attempts);
  const difficulty = useGameStore((state) => state.difficulty);

  const currentPlayerName = currentPlayer === 1 ? player1Name : player2Name;

  return (
    <GameScreenContainer>
      <GameInfo>
        <PlayerInfo $isActive={currentPlayer === 1} $playerColor={player1HighlightColor}>
          <h3>{player1Name}</h3>
          <p>
            Score: <span>{player1Score}</span>
          </p>
          <p>
            Attempts: <span>{player1Attempts}</span>
          </p>
        </PlayerInfo>

        <TurnIndicator>
          <h2>{currentPlayerName}&apos;s Turn</h2>
          <p>Difficulty: {difficulty}</p>
        </TurnIndicator>

        <PlayerInfo $isActive={currentPlayer === 2} $playerColor={player2HighlightColor}>
          <h3>{player2Name}</h3>
          <p>
            Score: <span>{player2Score}</span>
          </p>
          <p>
            Attempts: <span>{player2Attempts}</span>
          </p>
        </PlayerInfo>
      </GameInfo>

      <Board />
    </GameScreenContainer>
  );
}

export default GameScreen;

import { GameOverContainer, StatText, PlayAgainButton } from './GameOver.styles';

function GameOver({ duration, attempts, accuracy, onPlayAgain }) {
  return (
    <GameOverContainer>
      <h2>Game Over!</h2>
      <StatText>Duration: {duration} seconds</StatText>
      <StatText>Attempts: {attempts}</StatText>
      <StatText>Accuracy: {accuracy}%</StatText>
      <PlayAgainButton onClick={onPlayAgain}>Play Again</PlayAgainButton>
    </GameOverContainer>
  );
}

export default GameOver;

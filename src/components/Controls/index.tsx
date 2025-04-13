import { ControlsContainer, DifficultyButton } from './Controls.styles';

function Controls({ changeDifficulty }) {
  return (
    <ControlsContainer>
      <DifficultyButton onClick={() => changeDifficulty('easy')}>Easy</DifficultyButton>
      <DifficultyButton onClick={() => changeDifficulty('medium')}>Medium</DifficultyButton>
      <DifficultyButton onClick={() => changeDifficulty('hard')}>Hard</DifficultyButton>
    </ControlsContainer>
  );
}

export default Controls;

import type { Difficulty } from 'types';
import { useGameStore } from 'store/useGameStore';
import {
  DifficultyButton,
  DifficultySelection,
  PlayButton,
  PlayerInputs,
  StartScreenContainer,
} from './StartScreen.styles';

function StartScreen() {
  const player1Name = useGameStore((state) => state.player1Name);
  const player2Name = useGameStore((state) => state.player2Name);
  const difficulty = useGameStore((state) => state.difficulty);
  const setPlayerName = useGameStore((state) => state.setPlayerName);
  const setDifficulty = useGameStore((state) => state.setDifficulty);
  const startRolling = useGameStore((state) => state.startRolling);

  const handleDifficultySelect = (level: Difficulty) => {
    setDifficulty(level);
  };

  return (
    <StartScreenContainer>
      <h2>Game Setup</h2>
      <PlayerInputs>
        <label>
          Player 1 Name:
          <input
            type='text'
            value={player1Name}
            onChange={(e) => setPlayerName(1, e.target.value)}
            placeholder='Player 1'
            maxLength={20}
          />
        </label>
        <label>
          Player 2 Name:
          <input
            type='text'
            value={player2Name}
            onChange={(e) => setPlayerName(2, e.target.value)}
            placeholder='Player 2'
            maxLength={20}
          />
        </label>
      </PlayerInputs>

      <DifficultySelection>
        <h3>Select Difficulty:</h3>
        <div>
          <DifficultyButton onClick={() => handleDifficultySelect('easy')} $isActive={difficulty === 'easy'}>
            Easy (4x4)
          </DifficultyButton>
          <DifficultyButton onClick={() => handleDifficultySelect('medium')} $isActive={difficulty === 'medium'}>
            Medium (6x6)
          </DifficultyButton>
          <DifficultyButton onClick={() => handleDifficultySelect('hard')} $isActive={difficulty === 'hard'}>
            Hard (8x8)
          </DifficultyButton>
        </div>
      </DifficultySelection>

      <PlayButton onClick={startRolling} disabled={!difficulty}>
        Let&apos;s Play!
      </PlayButton>
    </StartScreenContainer>
  );
}

export default StartScreen;

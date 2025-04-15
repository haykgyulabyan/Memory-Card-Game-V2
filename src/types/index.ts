export type PicsumImage = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export type Difficulty = 'easy' | 'medium' | 'hard';

export type DifficultySettings = {
  gridSize: number;
  pairs: number;
  limit: number;
};

export type CardData = {
  id: string;
  contentId: string;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export type GamePhase = 'setup' | 'rolling' | 'loading_images' | 'playing' | 'finished';

export type Player = 1 | 2;

export interface GameState {
  // Setup
  gamePhase: GamePhase;
  difficulty: Difficulty | null;
  player1Name: string;
  player2Name: string;
  settings: DifficultySettings | null;

  // Gameplay
  currentPlayer: Player | null;
  player1Score: number;
  player2Score: number;
  player1Attempts: number;
  player2Attempts: number;
  cards: CardData[];
  flippedCards: string[];
  isChecking: boolean;
  startTime: number | null;
  endTime: number | null;

  player1TimeElapsed: number;
  player2TimeElapsed: number;
  currentTurnStartTime: number | null;
}

export type GameActions = {
  setPlayerName: (player: Player, name: string) => void;
  setDifficulty: (newDifficulty: Difficulty) => boolean;
  startRolling: () => void;
  rollToStart: () => void;
  prepareGameBoard: (imageData: PicsumImage[]) => void;
  flipCard: (cardId: string) => void;
  resetGame: () => void;
};

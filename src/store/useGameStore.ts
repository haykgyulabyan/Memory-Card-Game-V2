import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Difficulty, DifficultySettings, CardData, GameState, GameActions } from 'types';

const difficultyGridSizes: Record<Difficulty, number> = {
  easy: 4,
  medium: 6,
  hard: 8,
};

const shuffleArray = <T>(array: T[]): T[] => {
  let currentIndex = array.length;
  let randomIndex: number;
  const newArray = [...array];

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
};

const initialState: GameState = {
  gamePhase: 'setup',
  difficulty: null,
  player1Name: 'Player 1',
  player2Name: 'Player 2',
  settings: null,
  currentPlayer: null,
  player1Score: 0,
  player2Score: 0,
  player1Attempts: 0,
  player2Attempts: 0,
  cards: [],
  flippedCards: [],
  isChecking: false,
  startTime: null,
  endTime: null,
  player1TimeElapsed: 0,
  player2TimeElapsed: 0,
  currentTurnStartTime: null,
};

export const useGameStore = create<GameState & GameActions>()(
  immer((set, get) => ({
    ...initialState,

    setPlayerName: (player, name) => {
      set((state) => {
        const actualName = name.trim();
        if (player === 1) state.player1Name = actualName;
        if (player === 2) state.player2Name = actualName;
      });
    },

    setDifficulty: (newDifficulty) => {
      const currentPhase = get().gamePhase;
      const currentDifficulty = get().difficulty;

      if (newDifficulty === currentDifficulty) return true;

      if (currentPhase === 'playing' || currentPhase === 'rolling' || currentPhase === 'loading_images') {
        const proceed = window.confirm('Changing difficulty will reset the current game progress. Are you sure?');
        if (!proceed) return false;
      }

      set((state) => {
        state.difficulty = newDifficulty;

        const gridSize = difficultyGridSizes[newDifficulty];
        const pairs = gridSize * 2;
        const limit = pairs;
        const newSettings: DifficultySettings = { gridSize, pairs, limit };
        state.settings = newSettings;

        if (currentPhase !== 'setup' || state.cards.length > 0) {
          Object.assign(state, initialState, {
            difficulty: newDifficulty,
            settings: newSettings,
            player1Name: state.player1Name,
            player2Name: state.player2Name,
          });
          state.gamePhase = 'setup';
        }
      });
      return true;
    },

    startRolling: () => {
      const { difficulty, player1Name, player2Name } = get();

      if (!difficulty) {
        alert('Please select a difficulty level first!');
        return;
      }

      set((state) => {
        if (!player1Name) {
          state.player1Name = 'Player 1';
        }
        if (!player2Name) {
          state.player2Name = 'Player 2';
        }
        state.gamePhase = 'rolling';
      });
    },

    rollToStart: () => {
      const startingPlayer = Math.random() < 0.5 ? 1 : 2;
      set({
        currentPlayer: startingPlayer,
        gamePhase: 'loading_images',
        player1TimeElapsed: 0,
        player2TimeElapsed: 0,
        currentTurnStartTime: null,
        startTime: null,
        endTime: null,
      });
    },

    prepareGameBoard: (imageData) => {
      const settings = get().settings;
      if (!settings) return;

      const imagePairs = imageData.slice(0, settings.pairs).flatMap((img) => {
        const cardBase: Omit<CardData, 'id'> = {
          contentId: img.id,
          imageUrl: img.download_url.replace(/(\/id\/\d+\/)(\d+)\/(\d+)/, `$1${100}/${100}`),
          isFlipped: false,
          isMatched: false,
        };
        return [
          { ...cardBase, id: crypto.randomUUID() },
          { ...cardBase, id: crypto.randomUUID() },
        ];
      });

      set((state) => {
        state.cards = shuffleArray(imagePairs);
        state.player1Score = 0;
        state.player2Score = 0;
        state.player1Attempts = 0;
        state.player2Attempts = 0;
        state.flippedCards = [];
        state.isChecking = false;
        state.startTime = Date.now();
        state.endTime = null;
        state.gamePhase = 'playing';
        state.player1TimeElapsed = 0;
        state.player2TimeElapsed = 0;
        state.currentTurnStartTime = Date.now();
      });
    },

    flipCard: (cardId) => {
      const state = get();
      const cardToFlip = state.cards.find((c) => c.id === cardId);

      if (
        state.isChecking ||
        state.flippedCards.length === 2 ||
        cardToFlip?.isFlipped ||
        cardToFlip?.isMatched ||
        state.gamePhase !== 'playing'
      ) {
        return;
      }

      set((draft) => {
        const cardIndex = draft.cards.findIndex((c) => c.id === cardId);
        if (cardIndex === -1) return;

        draft.cards[cardIndex].isFlipped = true;
        draft.flippedCards.push(cardId);

        if (draft.flippedCards.length === 2) {
          draft.isChecking = true;

          if (draft.currentPlayer === 1) draft.player1Attempts++;
          else draft.player2Attempts++;

          const [id1, id2] = draft.flippedCards;
          const card1 = draft.cards.find((c) => c.id === id1)!;
          const card2 = draft.cards.find((c) => c.id === id2)!;

          const turnEndTime = Date.now();
          const currentTurnDuration = draft.currentTurnStartTime ? turnEndTime - draft.currentTurnStartTime : 0;

          if (card1.contentId === card2.contentId) {
            // --- MATCH ---
            card1.isMatched = true;
            card2.isMatched = true;

            if (draft.currentPlayer === 1) {
              draft.player1TimeElapsed += currentTurnDuration;
              draft.player1Score++;
            } else {
              draft.player2TimeElapsed += currentTurnDuration;
              draft.player2Score++;
            }

            draft.flippedCards = [];
            draft.isChecking = false;

            const allMatched = draft.cards.every((c) => c.isMatched);
            if (allMatched) {
              draft.endTime = turnEndTime;
              draft.gamePhase = 'finished';
              draft.currentTurnStartTime = null;
            } else {
              draft.currentTurnStartTime = Date.now();
            }
          } else {
            // --- NO MATCH ---
            if (draft.currentPlayer === 1) {
              draft.player1TimeElapsed += currentTurnDuration;
            } else {
              draft.player2TimeElapsed += currentTurnDuration;
            }

            setTimeout(() => {
              set((timeoutDraft) => {
                const c1Index = timeoutDraft.cards.findIndex((c) => c.id === id1);
                const c2Index = timeoutDraft.cards.findIndex((c) => c.id === id2);
                if (c1Index !== -1 && !timeoutDraft.cards[c1Index].isMatched) {
                  timeoutDraft.cards[c1Index].isFlipped = false;
                }
                if (c2Index !== -1 && !timeoutDraft.cards[c2Index].isMatched) {
                  timeoutDraft.cards[c2Index].isFlipped = false;
                }
                timeoutDraft.flippedCards = [];
                timeoutDraft.isChecking = false;

                timeoutDraft.currentPlayer = timeoutDraft.currentPlayer === 1 ? 2 : 1;
                timeoutDraft.currentTurnStartTime = Date.now();
              });
            }, 1000);
          }
        }
      });
    },

    resetGame: () => {
      set((state) => {
        Object.assign(state, initialState, {
          player1Name: state.player1Name,
          player2Name: state.player2Name,
        });
      });
    },
  })),
);

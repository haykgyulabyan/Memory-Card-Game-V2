import { useEffect } from 'react';
import { useGameStore } from 'store/useGameStore';
import { useFetchImages } from 'hooks/useFetchImages';
import StartScreen from 'components/StartScreen';
import RollToStart from 'components/RollToStart';
import GameScreen from 'components/GameScreen';
import EndScreen from 'components/EndScreen';
import LoadingSpinner from 'components/LoadingSpinner';
import ErrorDisplay from 'components/ErrorDisplay';
import './App.css';

function App() {
  const gamePhase = useGameStore((state) => state.gamePhase);
  const settings = useGameStore((state) => state.settings);
  const prepareGameBoard = useGameStore((state) => state.prepareGameBoard);

  const imageQueryEnabled = gamePhase === 'loading_images' && !!settings?.pairs;

  const { data: imageData, isLoading, isError, error, refetch } = useFetchImages(settings?.pairs, imageQueryEnabled);

  useEffect(() => {
    if (gamePhase === 'loading_images' && imageData && !isLoading && !isError) {
      prepareGameBoard(imageData);
    }
  }, [gamePhase, imageData, isLoading, isError, prepareGameBoard]);

  const renderPhase = () => {
    switch (gamePhase) {
      case 'setup':
        return <StartScreen />;
      case 'rolling':
        return <RollToStart />;
      case 'loading_images':
        if (isLoading) return <LoadingSpinner text='Fetching images...' />;
        if (isError) return <ErrorDisplay error={error} onRetry={refetch} />;
        return <LoadingSpinner text='Preparing board...' />;
      case 'playing':
        return <GameScreen />;
      case 'finished':
        return <EndScreen />;
      default:
        return <StartScreen />;
    }
  };

  return (
    <div className='app-container'>
      <h1>Memory Card Game</h1>
      {renderPhase()}
    </div>
  );
}

export default App;

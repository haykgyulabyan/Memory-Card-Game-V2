import { useGameStore } from 'store/useGameStore';
import Card from '../Card';
import { BoardGrid } from './Board.styles';

function Board() {
  const cards = useGameStore((state) => state.cards);
  const settings = useGameStore((state) => state.settings);
  const flipCard = useGameStore((state) => state.flipCard);

  if (!settings) {
    return <div>Error: Game settings not loaded.</div>;
  }

  return (
    <BoardGrid $gridSize={settings.gridSize}>
      {cards.map((card) => (
        <Card key={card.id} cardData={card} onCardClick={flipCard} />
      ))}
    </BoardGrid>
  );
}

export default Board;

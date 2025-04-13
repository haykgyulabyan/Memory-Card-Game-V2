import Card from '../Card';
import { BoardGrid } from './Board.styles';

function Board({ cards, flipped, matched, onCardClick, rows, cols }) {
  return (
    <BoardGrid rows={rows} cols={cols}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isFlipped={flipped.includes(card.id)}
          isMatched={matched.includes(card.id)}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </BoardGrid>
  );
}

export default Board;

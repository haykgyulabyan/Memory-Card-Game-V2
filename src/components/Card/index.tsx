import { DragEvent } from 'react';
import type { CardData } from 'types';
import { CardContainer, CardInner, CardFront, CardBack } from './Card.styles';

type CardProps = {
  cardData: CardData;
  onCardClick: (id: string) => void;
};

function Card({ cardData, onCardClick }: CardProps) {
  const { id, imageUrl, isFlipped, isMatched } = cardData;

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onCardClick(id);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  return (
    <CardContainer onClick={handleClick}>
      <CardInner $isFlipped={isFlipped} $isMatched={isMatched}>
        <CardBack />
        <CardFront $isMatched={isMatched}>
          <img src={imageUrl} alt='Card Content' draggable='false' onDragStart={handleDragStart} />
        </CardFront>
      </CardInner>
    </CardContainer>
  );
}

export default Card;

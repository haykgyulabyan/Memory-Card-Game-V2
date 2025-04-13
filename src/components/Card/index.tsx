import cardBack from 'assets/cards/back.svg';
import { CardContainer, CardInner, CardFront, CardBack } from './Card.styles';

function Card({ card, isFlipped, isMatched, onClick }) {
  return (
    <CardContainer onClick={onClick}>
      <CardInner isFlipped={isFlipped} isMatched={isMatched}>
        <CardBack>
          <img src={cardBack} alt='Card Back' />
        </CardBack>
        <CardFront isMatched={isMatched}>
          <img src={card.src} alt={card.contentId} />
        </CardFront>
      </CardInner>
    </CardContainer>
  );
}

export default Card;

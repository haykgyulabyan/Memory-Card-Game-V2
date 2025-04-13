import styled from 'styled-components';

export const CardContainer = styled.div`
  perspective: 1000px;
  width: 80px;
  height: 80px;
  cursor: pointer;
`;

export const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform ${({ isMatched }) => (isMatched ? '0.6s' : '0.3s')};
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  opacity: ${({ isMatched }) => (isMatched ? 0.7 : 1)};
`;

export const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const CardFront = styled(CardBack)`
  transform: ${({ isMatched }) => (isMatched ? 'rotateY(0deg)' : 'rotateY(180deg)')};
`;

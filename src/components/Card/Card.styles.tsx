import styled from 'styled-components';

type CardStyleProps = {
  $isFlipped?: boolean;
  $isMatched?: boolean;
};

export const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  perspective: 1000px;
  cursor: pointer;
  background-color: transparent;
  border-radius: 8px;
  overflow: hidden;
`;

export const CardInner = styled.div<CardStyleProps>`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  transform: ${({ $isFlipped }) => ($isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  opacity: ${({ $isMatched }) => ($isMatched ? 0.7 : 1)};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardBack = styled(CardFace)`
  background-color: #4a90e2;
  img {
    width: 70%;
    height: 70%;
    object-fit: contain;
  }
`;

export const CardFront = styled(CardFace)<CardStyleProps>`
  background-color: #fff;
  filter: ${({ $isMatched }) => ($isMatched ? 'brightness(90%) saturate(80%)' : 'none')};
  transform: ${({ $isMatched }) => ($isMatched ? 'rotateY(0deg)' : 'rotateY(180deg)')};
  transition: filter 0.3s ease-in-out;
`;

import styled from 'styled-components';

type BoardGridProps = {
  $gridSize: number;
};

export const BoardGrid = styled.div<BoardGridProps>`
  display: grid;
  gap: clamp(5px, 1.5vw, 10px);
  width: fit-content;
  margin: 20px auto;
  padding: 10px;
  background-color: #e0e0e0;
  border-radius: 8px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

  grid-template-columns: repeat(${(props) => props.$gridSize}, clamp(60px, 10vw, 100px));
  grid-auto-rows: clamp(60px, 10vw, 100px);

  @media (max-width: 600px) {
    gap: 5px;
    padding: 5px;
    grid-template-columns: repeat(${(props) => props.$gridSize}, clamp(45px, 12vw, 70px));
    grid-auto-rows: clamp(45px, 12vw, 70px);
  }
`;

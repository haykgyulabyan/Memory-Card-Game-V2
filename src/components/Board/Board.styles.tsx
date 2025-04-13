import styled from 'styled-components';

export const BoardGrid = styled.div`
  display: grid;
  gap: 10px;
  max-width: 720px;
  margin: 0 auto;
  grid-template-columns: ${({ cols }) => `repeat(${cols}, 1fr)`};
  grid-template-rows: ${({ rows }) => `repeat(${rows}, 80px)`};
`;

import styled, { keyframes } from 'styled-components';

export const RollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;
  min-height: 200px;
`;

export const RollButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const coinFlipAnimation = keyframes`
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(1800deg); }
  100% { transform: rotateY(3600deg); }
`;

export const CoinAnimation = styled.div`
  font-size: 4rem;
  animation: ${coinFlipAnimation} 1.5s ease-out forwards;
`;

export const RollResultText = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: #007bff;
  margin-top: 15px;
`;

import styled from 'styled-components';

export const EndScreenContainer = styled.div`
  margin-top: 20px;
  padding: 25px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const WinnerMessage = styled.h3`
  color: #28a745;
  font-size: 1.5rem;
  margin-bottom: 10px;

  &.tie {
    color: #ffc107;
  }
`;

export const FinalStats = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 500px;
  gap: 20px;
  margin-bottom: 15px;
`;

export const PlayerStats = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1;

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #007bff;
  }
  p {
    margin: 4px 0;
    color: #555;
  }
  span {
    font-weight: bold;
  }
`;

export const PlayAgainButton = styled.button`
  margin-top: 10px;
  padding: 12px 25px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

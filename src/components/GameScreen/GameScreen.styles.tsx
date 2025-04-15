import styled from 'styled-components';

export const GameScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const GameInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  max-width: 800px;
  padding: 10px 0;
  gap: 15px;
`;

type PlayerInfoProps = {
  $isActive: boolean;
  $playerColor: string;
};

export const PlayerInfo = styled.div<PlayerInfoProps>`
  border: 3px solid ${(props) => (props.$isActive ? props.$playerColor : 'transparent')};
  background-color: ${(props) => (props.$isActive ? props.$playerColor + '20' : '#f8f9fa')};
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  min-width: 150px;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #333;
  }
  p {
    margin: 5px 0;
    font-size: 0.95rem;
    color: #555;
  }
  span {
    font-weight: bold;
  }
`;

export const TurnIndicator = styled.div`
  text-align: center;
  padding-top: 10px;

  h2 {
    margin: 0 0 5px 0;
    font-size: 1.4rem;
    color: #333;
  }
  p {
    margin: 0;
    color: #666;
    font-style: italic;
    text-transform: capitalize;
  }
`;

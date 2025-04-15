import styled from 'styled-components';

export const StartScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const PlayerInputs = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    font-weight: bold;
  }

  input {
    width: 150px;
  }
`;

export const DifficultySelection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  h3 {
    margin: 0 0 5px 0;
    color: #555;
  }

  div {
    display: flex;
    gap: 15px;
  }
`;

type DifficultyButtonProps = {
  $isActive: boolean;
};

export const DifficultyButton = styled.button<DifficultyButtonProps>`
  padding: 10px 20px;
  font-size: 1rem;
  border: 2px solid ${(props) => (props.$isActive ? '#007bff' : '#ccc')};
  background-color: ${(props) => (props.$isActive ? '#e7f3ff' : '#fff')};
  color: ${(props) => (props.$isActive ? '#0056b3' : '#333')};
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};

  &:hover:not(:disabled) {
    border-color: ${(props) => (props.$isActive ? '#0056b3' : '#bbb')};
    background-color: ${(props) => (props.$isActive ? '#d0eaff' : '#eee')};
  }
`;

export const PlayButton = styled.button`
  padding: 12px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;

  &:hover:not(:disabled) {
    background-color: #218838;
  }

  &:disabled {
    background-color: #6c757d;
  }
`;

import styled from 'styled-components';

export const ErrorContainer = styled.div`
  border: 2px solid #dc3545;
  background-color: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  text-align: center;

  h3 {
    margin-top: 0;
    color: #721c24;
  }

  pre {
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 4px;
    max-width: 100%;
    overflow-x: auto;
    font-size: 0.9em;
    color: #333;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    &:hover {
      background-color: #0056b3;
    }
  }
`;

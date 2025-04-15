import { LoadingContainer, Spinner, LoadingText } from './LoadingSpinner.styles';

type LoadingSpinnerProps = {
  text?: string;
};

function LoadingSpinner({ text = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
}

export default LoadingSpinner;

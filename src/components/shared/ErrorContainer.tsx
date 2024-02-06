import { ReactNode } from 'react';

const ErrorContainer = ({
  errorMessage,
  children,
  showError,
  errorId,
}: {
  errorMessage: string | null;
  children: ReactNode | ReactNode[];
  showError: boolean;
  errorId: string;
}) => {
  return (
    <div className={showError && errorMessage ? 'error' : ''}>
      {children}
      {showError && errorMessage && (
        <div className="error-wrapper">
          <span id={errorId}>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default ErrorContainer;

import { ReactNode } from 'react';

const ErrorContainer = ({
  errorMessage,
  children,
  showError
}: {
  errorMessage: string | null;
  children: ReactNode | ReactNode[];
  showError: boolean;
}) => {
  return (
    <div className={showError && errorMessage ? 'error' : ''}>
      {children}
      {showError && errorMessage && (
        <div className="error-wrapper">
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default ErrorContainer;

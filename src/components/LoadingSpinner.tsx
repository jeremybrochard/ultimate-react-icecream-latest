import { useEffect, useRef, useState } from 'react';

const LoadingSpinner = ({
  loadingMessage = 'Loading...',
  doneLoadingMessage = 'Loading data is complete!',
  isLoading = false,
}: {
  loadingMessage?: string;
  doneLoadingMessage?: string,
  isLoading?: boolean;
}) => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [showLoadingDoneMessage, setShowLoadingDoneMessager] = useState(false);
  let previousLoadingState = useRef(false);

  useEffect(() => {
    let timeOutCallback: any;
    let timeOutDoneMessageCallback: any;

    if (isLoading) {
      timeOutCallback = setTimeout(() => {
        setShowLoadingSpinner(true);
      }, 300);
    } else {
      if (previousLoadingState.current) {
        setShowLoadingDoneMessager(true);

        timeOutDoneMessageCallback = setTimeout(() => {
          setShowLoadingDoneMessager(false);
        }, 300);
      }
    }

    previousLoadingState.current = isLoading;
    return () => {
      clearTimeout(timeOutCallback);
      clearTimeout(timeOutDoneMessageCallback);
      setShowLoadingSpinner(false);
      setShowLoadingDoneMessager(false);
    };
  }, [isLoading]);

  return (
    <div aria-live="assertive" aria-atomic="true">
      {showLoadingSpinner && <p className="loading">{loadingMessage}</p>}
      {showLoadingDoneMessage && <p className="visually-hidden">{doneLoadingMessage}</p>}
    </div>
  );
};

export default LoadingSpinner;

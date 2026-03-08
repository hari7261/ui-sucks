import * as React from 'react';

export function useCallbackRef<T extends (...args: never[]) => unknown>(callback: T | undefined) {
  const callbackRef = React.useRef<T | undefined>(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return callbackRef;
}

import * as React from 'react';

import { useCallbackRef } from './useCallbackRef';

export interface UseControllableStateParams<T> {
  value: T | undefined;
  defaultValue: T;
  onChange?: ((value: T) => void) | undefined;
}

export type SetControllableState<T> = React.Dispatch<React.SetStateAction<T>>;

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;
  const valueRef = React.useRef(currentValue);
  const onChangeRef = useCallbackRef(onChange);

  React.useEffect(() => {
    valueRef.current = currentValue;
  }, [currentValue]);

  const setValue = React.useCallback<SetControllableState<T>>(
    (nextValue) => {
      const resolvedValue =
        typeof nextValue === 'function'
          ? (nextValue as (previousValue: T) => T)(valueRef.current)
          : nextValue;

      if (Object.is(resolvedValue, valueRef.current)) {
        return;
      }

      if (!isControlled) {
        setUncontrolledValue(resolvedValue);
      }

      onChangeRef.current?.(resolvedValue);
    },
    [isControlled, onChangeRef],
  );

  return [currentValue, setValue] as const;
}

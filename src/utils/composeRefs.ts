import type * as React from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

function assignRef<T>(ref: PossibleRef<T>, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

export function composeRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
}

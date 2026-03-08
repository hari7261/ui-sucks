import * as React from 'react';

import { ToastContext, useToastContext } from './toast.context';
import type { ToastController, ToastOptions, ToastProviderProps } from './toast.types';

export function ToastProvider({ children, defaultDuration = 5000 }: ToastProviderProps) {
  const idRef = React.useRef(0);
  const [toasts, setToasts] = React.useState<ReturnType<typeof createToastRecord>[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const clear = React.useCallback(() => {
    setToasts([]);
  }, []);

  const push = React.useCallback((options: ToastOptions) => {
    const id = options.id ?? `toast-${++idRef.current}`;

    setToasts((current) => [...current.filter((toast) => toast.id !== id), createToastRecord(id, options)]);

    return id;
  }, []);

  const value = React.useMemo<ToastController>(
    () => ({
      defaultDuration,
      toasts,
      push,
      dismiss,
      clear,
    }),
    [clear, defaultDuration, dismiss, push, toasts],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

function createToastRecord(id: string, options: ToastOptions) {
  return {
    ...options,
    id,
  };
}

export function useToast() {
  return useToastContext('useToast');
}

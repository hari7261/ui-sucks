import * as React from 'react';

import type { ToastController } from './toast.types';

const ToastContext = React.createContext<ToastController | null>(null);

export function useToastContext(componentName: string) {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error(`${componentName} must be used inside <ToastProvider>.`);
  }

  return context;
}

export { ToastContext };

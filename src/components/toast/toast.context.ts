import * as React from 'react';

import type { ToastController, ToastRecord } from './toast.types';

export interface ToastStateRecord extends ToastRecord {
  key: number;
}

export interface ToastContextValue extends Omit<ToastController, 'toasts'> {
  toasts: ToastStateRecord[];
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToastContext(componentName: string) {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error(`${componentName} must be used inside <ToastProvider>.`);
  }

  return context;
}

export { ToastContext };

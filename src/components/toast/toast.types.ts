import type * as React from 'react';

export interface ToastProviderProps {
  children: React.ReactNode;
  defaultDuration?: number;
}

export interface ToastOptions {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  duration?: number;
  role?: 'status' | 'alert';
}

export interface ToastRecord extends ToastOptions {
  id: string;
}

export interface ToastController {
  defaultDuration: number;
  toasts: ToastRecord[];
  push: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

export type ToastViewportProps = React.HTMLAttributes<HTMLDivElement>;

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
  role?: 'status' | 'alert';
}

import * as React from 'react';

import { useControllableState } from '../../utils/useControllableState';
import { useToastContext } from './toast.context';
import type { ToastProps, ToastViewportProps } from './toast.types';

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>((props, forwardedRef) => {
  const {
    open,
    defaultOpen = true,
    onOpenChange,
    duration = 5000,
    role = 'status',
    onKeyDown,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    children,
    style,
    ...toastProps
  } = props;
  const [isOpen, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const timerRef = React.useRef<number | null>(null);

  const clearTimer = React.useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = React.useCallback(() => {
    if (typeof window === 'undefined' || duration <= 0) {
      return;
    }

    clearTimer();
    timerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, duration);
  }, [clearTimer, duration, setOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      clearTimer();
      return;
    }

    startTimer();

    return clearTimer;
  }, [clearTimer, isOpen, startTimer]);

  React.useEffect(() => clearTimer, [clearTimer]);

  const handleKeyDown = React.useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
      }
    },
    [onKeyDown, setOpen],
  );

  const pause = React.useCallback(() => {
    clearTimer();
  }, [clearTimer]);

  const resume = React.useCallback(() => {
    if (isOpen) {
      startTimer();
    }
  }, [isOpen, startTimer]);

  const handlePointerEnter = React.useCallback<React.PointerEventHandler<HTMLDivElement>>(
    (event) => {
      onPointerEnter?.(event);

      if (!event.defaultPrevented) {
        pause();
      }
    },
    [onPointerEnter, pause],
  );

  const handlePointerLeave = React.useCallback<React.PointerEventHandler<HTMLDivElement>>(
    (event) => {
      onPointerLeave?.(event);

      if (!event.defaultPrevented) {
        resume();
      }
    },
    [onPointerLeave, resume],
  );

  const handleFocus = React.useCallback<React.FocusEventHandler<HTMLDivElement>>(
    (event) => {
      onFocus?.(event);

      if (!event.defaultPrevented) {
        pause();
      }
    },
    [onFocus, pause],
  );

  const handleBlur = React.useCallback<React.FocusEventHandler<HTMLDivElement>>(
    (event) => {
      onBlur?.(event);

      if (!event.defaultPrevented) {
        resume();
      }
    },
    [onBlur, resume],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div
      {...toastProps}
      ref={forwardedRef}
      role={role}
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
      aria-atomic="true"
      data-state="open"
      onKeyDown={handleKeyDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={
        style
          ? {
              padding: 14,
              borderRadius: 14,
              background: 'var(--ui-glass-strong, rgba(255, 255, 255, 0.14))',
              border: '1px solid var(--ui-border, rgba(255, 255, 255, 0.18))',
              color: 'var(--ui-text, #f6f4f0)',
              boxShadow: 'var(--ui-shadow, 0 20px 60px rgba(10, 16, 19, 0.35))',
              ...style,
            }
          : {
              padding: 14,
              borderRadius: 14,
              background: 'var(--ui-glass-strong, rgba(255, 255, 255, 0.14))',
              border: '1px solid var(--ui-border, rgba(255, 255, 255, 0.18))',
              color: 'var(--ui-text, #f6f4f0)',
              boxShadow: 'var(--ui-shadow, 0 20px 60px rgba(10, 16, 19, 0.35))',
            }
      }
    >
      {children}
    </div>
  );
});

Toast.displayName = 'Toast';

export const ToastViewport = React.forwardRef<HTMLDivElement, ToastViewportProps>(
  ({ children, style, ...props }, forwardedRef) => {
    const { toasts, dismiss, defaultDuration } = useToastContext('ToastViewport');

    return (
      <div
        {...props}
        ref={forwardedRef}
        role="region"
        aria-label="Notifications"
        style={
          style
            ? {
                position: 'fixed',
                right: 24,
                bottom: 24,
                display: 'grid',
                gap: 12,
                width: 'min(90vw, 320px)',
                ...style,
              }
            : {
                position: 'fixed',
                right: 24,
                bottom: 24,
                display: 'grid',
                gap: 12,
                width: 'min(90vw, 320px)',
              }
        }
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.key}
            duration={toast.duration ?? defaultDuration}
            role={toast.role ?? 'status'}
            defaultOpen
            data-toast-id={toast.id}
            onOpenChange={(nextOpen) => {
              if (!nextOpen) {
                dismiss(toast.id);
              }
            }}
          >
            {toast.content ?? (
              <>
                {toast.title ? <div>{toast.title}</div> : null}
                {toast.description ? <div>{toast.description}</div> : null}
              </>
            )}
          </Toast>
        ))}
        {children}
      </div>
    );
  },
);

ToastViewport.displayName = 'ToastViewport';

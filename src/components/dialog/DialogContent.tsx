import * as React from 'react';

import { composeRefs } from '../../utils/composeRefs';
import { getFirstFocusableElement, getFocusableElements } from '../../utils/focus';
import { useDialogContext } from './dialog.context';
import { DialogPortal } from './DialogPortal';
import type { DialogContentProps } from './dialog.types';

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>((props, forwardedRef) => {
  const {
    forceMount = false,
    trapFocus = true,
    restoreFocus = true,
    dismissible = true,
    closeOnInteractOutside = true,
    portalled = false,
    container,
    onEscapeKeyDown,
    onInteractOutside,
    onKeyDown,
    hidden,
    role = 'dialog',
    tabIndex = -1,
    ...contentProps
  } = props;
  const {
    open,
    setOpen,
    modal,
    contentId,
    titleId,
    descriptionId,
    triggerRef,
    contentRef,
    hasTitle,
    hasDescription,
  } = useDialogContext('DialogContent');
  const localRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open || typeof document === 'undefined') {
      return;
    }

    const previousActiveElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const frame = window.requestAnimationFrame(() => {
      const node = localRef.current;

      if (!node) {
        return;
      }

      const focusTarget = getFirstFocusableElement(node) ?? node;
      focusTarget.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);

      if (restoreFocus) {
        previousActiveElement?.focus();
      }
    };
  }, [open, restoreFocus]);

  React.useEffect(() => {
    if (!open || !modal || typeof document === 'undefined') {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [modal, open]);

  React.useEffect(() => {
    if (!open || !dismissible || typeof document === 'undefined') {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const node = localRef.current;
      const target = event.target as Node | null;

      if (!node || !target || node.contains(target) || triggerRef.current?.contains(target)) {
        return;
      }

      onInteractOutside?.(event);

      if (!event.defaultPrevented && closeOnInteractOutside) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [closeOnInteractOutside, dismissible, onInteractOutside, open, setOpen, triggerRef]);

  const handleKeyDown = React.useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'Escape' && dismissible) {
        onEscapeKeyDown?.(event.nativeEvent);

        if (!event.nativeEvent.defaultPrevented) {
          event.preventDefault();
          setOpen(false);
        }

        return;
      }

      if (event.key !== 'Tab' || !trapFocus) {
        return;
      }

      const node = localRef.current;

      if (!node) {
        return;
      }

      const focusableElements = getFocusableElements(node);

      if (focusableElements.length === 0) {
        event.preventDefault();
        node.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === firstElement || activeElement === node) {
          event.preventDefault();
          lastElement?.focus();
        }

        return;
      }

      if (activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    },
    [dismissible, onEscapeKeyDown, onKeyDown, setOpen, trapFocus],
  );

  if (!open && !forceMount) {
    return null;
  }

  const content = (
    <div
      {...contentProps}
      id={contentId}
      ref={composeRefs(forwardedRef, contentRef, localRef)}
      role={role}
      tabIndex={tabIndex}
      hidden={hidden ?? !open}
      aria-modal={modal || undefined}
      aria-labelledby={hasTitle ? titleId : undefined}
      aria-describedby={hasDescription ? descriptionId : undefined}
      data-state={open ? 'open' : 'closed'}
      onKeyDown={handleKeyDown}
    />
  );

  if (portalled) {
    return (
      <DialogPortal container={container} forceMount={forceMount}>
        {content}
      </DialogPortal>
    );
  }

  return content;
});

DialogContent.displayName = 'DialogContent';

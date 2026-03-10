import * as React from 'react';

import { composeRefs } from '../../utils/composeRefs';
import { useDialogContext } from './dialog.context';
import type { DialogTriggerProps } from './dialog.types';

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ onClick, type = 'button', disabled, style, ...props }, forwardedRef) => {
    const { open, setOpen, contentId, triggerRef } = useDialogContext('DialogTrigger');

    const handleClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      (event) => {
        onClick?.(event);

        if (event.defaultPrevented || disabled) {
          return;
        }

        setOpen(!open);
      },
      [disabled, onClick, open, setOpen],
    );

    return (
      <button
        {...props}
        ref={composeRefs(forwardedRef, triggerRef)}
        type={type}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={contentId}
        data-state={open ? 'open' : 'closed'}
        onClick={handleClick}
        style={
          style
            ? {
                borderRadius: 999,
                padding: '8px 14px',
                border: '1px solid var(--ui-border, rgba(255, 255, 255, 0.18))',
                background: 'var(--ui-glass, rgba(255, 255, 255, 0.08))',
                color: 'var(--ui-text, #f6f4f0)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                ...style,
              }
            : {
                borderRadius: 999,
                padding: '8px 14px',
                border: '1px solid var(--ui-border, rgba(255, 255, 255, 0.18))',
                background: 'var(--ui-glass, rgba(255, 255, 255, 0.08))',
                color: 'var(--ui-text, #f6f4f0)',
                cursor: disabled ? 'not-allowed' : 'pointer',
              }
        }
      />
    );
  },
);

DialogTrigger.displayName = 'DialogTrigger';

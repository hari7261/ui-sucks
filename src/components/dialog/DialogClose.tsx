import * as React from 'react';

import { useDialogContext } from './dialog.context';
import type { DialogCloseProps } from './dialog.types';

export const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ onClick, type = 'button', disabled, style, ...props }, forwardedRef) => {
    const { setOpen } = useDialogContext('DialogClose');

    const handleClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      (event) => {
        onClick?.(event);

        if (event.defaultPrevented || disabled) {
          return;
        }

        setOpen(false);
      },
      [disabled, onClick, setOpen],
    );

    return (
      <button
        {...props}
        ref={forwardedRef}
        type={type}
        disabled={disabled}
        onClick={handleClick}
        style={
          style
            ? {
                borderRadius: 999,
                padding: '8px 14px',
                border: '1px solid var(--ui-border, rgba(255, 255, 255, 0.18))',
                background: 'transparent',
                color: 'var(--ui-text, #f6f4f0)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                ...style,
              }
            : {
                borderRadius: 999,
                padding: '8px 14px',
                border: '1px solid var(--ui-border, rgba(255, 255, 255, 0.18))',
                background: 'transparent',
                color: 'var(--ui-text, #f6f4f0)',
                cursor: disabled ? 'not-allowed' : 'pointer',
              }
        }
      />
    );
  },
);

DialogClose.displayName = 'DialogClose';

import * as React from 'react';

import { useDialogContext } from './dialog.context';
import type { DialogCloseProps } from './dialog.types';

export const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ onClick, type = 'button', disabled, ...props }, forwardedRef) => {
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
      />
    );
  },
);

DialogClose.displayName = 'DialogClose';

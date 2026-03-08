import * as React from 'react';

import { composeRefs } from '../../utils/composeRefs';
import { useDialogContext } from './dialog.context';
import type { DialogTriggerProps } from './dialog.types';

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ onClick, type = 'button', disabled, ...props }, forwardedRef) => {
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
      />
    );
  },
);

DialogTrigger.displayName = 'DialogTrigger';

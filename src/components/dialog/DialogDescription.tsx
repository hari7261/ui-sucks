import * as React from 'react';

import { useDialogContext } from './dialog.context';
import type { DialogDescriptionProps } from './dialog.types';

export const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ id, children, style, ...props }, forwardedRef) => {
    const { descriptionId, registerDescription } = useDialogContext('DialogDescription');

    React.useEffect(() => registerDescription(), [registerDescription]);

    return (
      <p
        {...props}
        id={id ?? descriptionId}
        ref={forwardedRef}
        style={
          style
            ? {
                margin: '8px 0 0',
                lineHeight: 1.5,
                color: 'var(--ui-muted, rgba(246, 244, 240, 0.72))',
                ...style,
              }
            : {
                margin: '8px 0 0',
                lineHeight: 1.5,
                color: 'var(--ui-muted, rgba(246, 244, 240, 0.72))',
              }
        }
      >
        {children}
      </p>
    );
  },
);

DialogDescription.displayName = 'DialogDescription';

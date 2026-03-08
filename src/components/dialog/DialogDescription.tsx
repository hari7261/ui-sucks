import * as React from 'react';

import { useDialogContext } from './dialog.context';
import type { DialogDescriptionProps } from './dialog.types';

export const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ id, children, ...props }, forwardedRef) => {
    const { descriptionId, registerDescription } = useDialogContext('DialogDescription');

    React.useEffect(() => registerDescription(), [registerDescription]);

    return (
      <p {...props} id={id ?? descriptionId} ref={forwardedRef}>
        {children}
      </p>
    );
  },
);

DialogDescription.displayName = 'DialogDescription';

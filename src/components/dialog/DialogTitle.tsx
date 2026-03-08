import * as React from 'react';

import { useDialogContext } from './dialog.context';
import type { DialogTitleProps } from './dialog.types';

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ id, children, ...props }, forwardedRef) => {
    const { titleId, registerTitle } = useDialogContext('DialogTitle');

    React.useEffect(() => registerTitle(), [registerTitle]);

    return (
      <h2 {...props} id={id ?? titleId} ref={forwardedRef}>
        {children}
      </h2>
    );
  },
);

DialogTitle.displayName = 'DialogTitle';

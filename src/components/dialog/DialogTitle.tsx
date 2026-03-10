import * as React from 'react';

import { useDialogContext } from './dialog.context';
import type { DialogTitleProps } from './dialog.types';

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ id, children, style, ...props }, forwardedRef) => {
    const { titleId, registerTitle } = useDialogContext('DialogTitle');

    React.useEffect(() => registerTitle(), [registerTitle]);

    return (
      <h2
        {...props}
        id={id ?? titleId}
        ref={forwardedRef}
        style={
          style
            ? { margin: 0, fontSize: 20, lineHeight: 1.2, ...style }
            : { margin: 0, fontSize: 20, lineHeight: 1.2 }
        }
      >
        {children}
      </h2>
    );
  },
);

DialogTitle.displayName = 'DialogTitle';

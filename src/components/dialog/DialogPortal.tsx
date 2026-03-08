import * as React from 'react';
import { createPortal } from 'react-dom';

import { useDialogContext } from './dialog.context';
import type { DialogPortalProps } from './dialog.types';

export function DialogPortal({ children, container, forceMount = false }: DialogPortalProps) {
  const { open } = useDialogContext('DialogPortal');

  if (!open && !forceMount) {
    return null;
  }

  if (typeof document === 'undefined') {
    return <>{children}</>;
  }

  return createPortal(children, container ?? document.body);
}

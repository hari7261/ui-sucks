import * as React from 'react';

import { useControllableState } from '../../utils/useControllableState';
import { DialogContext } from './dialog.context';
import type { DialogProps } from './dialog.types';

export function Dialog({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  modal = true,
}: DialogProps) {
  const [isOpen, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const baseId = React.useId();
  const [titleCount, setTitleCount] = React.useState(0);
  const [descriptionCount, setDescriptionCount] = React.useState(0);

  const registerTitle = React.useCallback(() => {
    setTitleCount((current) => current + 1);

    return () => {
      setTitleCount((current) => Math.max(0, current - 1));
    };
  }, []);

  const registerDescription = React.useCallback(() => {
    setDescriptionCount((current) => current + 1);

    return () => {
      setDescriptionCount((current) => Math.max(0, current - 1));
    };
  }, []);

  const contextValue = React.useMemo(
    () => ({
      open: isOpen,
      setOpen,
      modal,
      contentId: `${baseId}-content`,
      titleId: `${baseId}-title`,
      descriptionId: `${baseId}-description`,
      triggerRef,
      contentRef,
      hasTitle: titleCount > 0,
      hasDescription: descriptionCount > 0,
      registerTitle,
      registerDescription,
    }),
    [baseId, descriptionCount, isOpen, modal, registerDescription, registerTitle, setOpen, titleCount],
  );

  return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>;
}

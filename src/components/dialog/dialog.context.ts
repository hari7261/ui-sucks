import * as React from 'react';

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  modal: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  hasTitle: boolean;
  hasDescription: boolean;
  registerTitle: () => () => void;
  registerDescription: () => () => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

export function useDialogContext(componentName: string) {
  const context = React.useContext(DialogContext);

  if (!context) {
    throw new Error(`${componentName} must be used inside <Dialog>.`);
  }

  return context;
}

export { DialogContext };

import type * as React from 'react';

export interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

export type DialogTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type DialogCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface DialogPortalProps {
  children: React.ReactNode;
  container?: Element | DocumentFragment | null | undefined;
  forceMount?: boolean;
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean;
  trapFocus?: boolean;
  restoreFocus?: boolean;
  dismissible?: boolean;
  closeOnInteractOutside?: boolean;
  portalled?: boolean;
  container?: Element | DocumentFragment | null | undefined;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onInteractOutside?: (event: PointerEvent) => void;
}

export type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

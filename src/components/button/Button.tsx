import * as React from 'react';

import { useControllableState } from '../../utils/useControllableState';
import type { ButtonProps } from './button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
  const {
    toggle = false,
    pressed,
    defaultPressed = false,
    onPressedChange,
    onClick,
    type = 'button',
    disabled,
    ...buttonProps
  } = props;
  const [isPressed, setPressed] = useControllableState<boolean>({
    value: pressed,
    defaultValue: defaultPressed,
    onChange: onPressedChange,
  });

  const handleClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      onClick?.(event);

      if (event.defaultPrevented || disabled || !toggle) {
        return;
      }

      setPressed((current) => !current);
    },
    [disabled, onClick, setPressed, toggle],
  );

  return (
    <button
      {...buttonProps}
      ref={forwardedRef}
      type={type}
      disabled={disabled}
      aria-pressed={toggle ? isPressed : undefined}
      data-state={toggle ? (isPressed ? 'on' : 'off') : undefined}
      onClick={handleClick}
    />
  );
});

Button.displayName = 'Button';

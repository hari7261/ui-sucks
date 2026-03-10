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
    variant = 'solid',
    size = 'md',
    type = 'button',
    disabled,
    style,
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

  const sizeStyles: Record<NonNullable<ButtonProps['size']>, React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: 12 },
    md: { padding: '10px 16px', fontSize: 14 },
    lg: { padding: '12px 20px', fontSize: 16 },
  };

  const variantStyles: Record<NonNullable<ButtonProps['variant']>, React.CSSProperties> = {
    solid: {
      background: 'var(--ui-accent, #f4b860)',
      color: '#1b1409',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 12px 30px rgba(244, 184, 96, 0.3)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ui-text, #f6f4f0)',
      border: '1px solid var(--ui-border, rgba(255, 255, 255, 0.18))',
    },
    glass: {
      background: 'var(--ui-glass, rgba(255, 255, 255, 0.08))',
      color: 'var(--ui-text, #f6f4f0)',
      border: '1px solid var(--ui-border, rgba(255, 255, 255, 0.18))',
      boxShadow: 'var(--ui-shadow, 0 20px 60px rgba(10, 16, 19, 0.35))',
    },
  };

  const mergedStyle = style
    ? { ...sizeStyles[size], ...variantStyles[variant], ...style }
    : { ...sizeStyles[size], ...variantStyles[variant] };

  return (
    <button
      {...buttonProps}
      ref={forwardedRef}
      type={type}
      disabled={disabled}
      aria-pressed={toggle ? isPressed : undefined}
      data-state={toggle ? (isPressed ? 'on' : 'off') : undefined}
      data-variant={variant}
      data-size={size}
      onClick={handleClick}
      style={{
        borderRadius: 999,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        ...mergedStyle,
      }}
    />
  );
});

Button.displayName = 'Button';

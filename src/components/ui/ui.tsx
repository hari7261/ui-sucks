import * as React from 'react';

import { useControllableState } from '../../utils/useControllableState';

const tokens = {
  glass: 'var(--ui-glass, rgba(255, 255, 255, 0.08))',
  glassStrong: 'var(--ui-glass-strong, rgba(255, 255, 255, 0.14))',
  border: 'var(--ui-border, rgba(255, 255, 255, 0.18))',
  text: 'var(--ui-text, #f6f4f0)',
  muted: 'var(--ui-muted, rgba(246, 244, 240, 0.72))',
  subtle: 'var(--ui-subtle, rgba(246, 244, 240, 0.52))',
  accent: 'var(--ui-accent, #f4b860)',
  accentStrong: 'var(--ui-accent-strong, #ffd18a)',
  mint: 'var(--ui-mint, #7ee0d3)',
  shadow: 'var(--ui-shadow, 0 20px 60px rgba(10, 16, 19, 0.35))',
  radius: 'var(--ui-radius, 16px)',
};

function mergeStyles(base: React.CSSProperties, style?: React.CSSProperties) {
  return style ? { ...base, ...style } : base;
}

export type CardTone = 'glass' | 'solid' | 'clear';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ tone = 'glass', style, ...props }, ref) => {
    const toneStyles: Record<CardTone, React.CSSProperties> = {
      glass: {
        background: tokens.glass,
        border: `1px solid ${tokens.border}`,
        boxShadow: tokens.shadow,
      },
      solid: {
        background: 'var(--ui-solid, rgba(12, 18, 21, 0.9))',
        border: `1px solid ${tokens.border}`,
        boxShadow: tokens.shadow,
      },
      clear: {
        background: 'transparent',
        border: `1px solid ${tokens.border}`,
      },
    };

    return (
      <div
        {...props}
        ref={ref}
        data-ui="card"
        style={mergeStyles(
          {
            color: tokens.text,
            borderRadius: tokens.radius,
            padding: 20,
          },
          mergeStyles(toneStyles[tone], style),
        )}
      />
    );
  },
);

Card.displayName = 'Card';

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ style, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      data-ui="card-header"
      style={mergeStyles({ display: 'grid', gap: 6 }, style)}
    />
  ),
);

CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ style, ...props }, ref) => (
    <div {...props} ref={ref} data-ui="card-body" style={mergeStyles({}, style)} />
  ),
);

CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ style, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      data-ui="card-footer"
      style={mergeStyles({ display: 'flex', gap: 12, flexWrap: 'wrap' }, style)}
    />
  ),
);

CardFooter.displayName = 'CardFooter';

export type BadgeTone = 'default' | 'accent' | 'mint' | 'ink';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = 'default', style, ...props }, ref) => {
    const toneStyles: Record<BadgeTone, React.CSSProperties> = {
      default: {
        background: tokens.glassStrong,
        color: tokens.text,
      },
      accent: {
        background: 'rgba(244, 184, 96, 0.2)',
        color: tokens.accentStrong,
      },
      mint: {
        background: 'rgba(126, 224, 211, 0.2)',
        color: tokens.mint,
      },
      ink: {
        background: 'rgba(255, 255, 255, 0.16)',
        color: tokens.text,
      },
    };

    return (
      <span
        {...props}
        ref={ref}
        data-ui="badge"
        style={mergeStyles(
          {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.02em',
          },
          mergeStyles(toneStyles[tone], style),
        )}
      />
    );
  },
);

Badge.displayName = 'Badge';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: number;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = 'Avatar', size = 36, style, children, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      data-ui="avatar"
      style={mergeStyles(
        {
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'grid',
          placeItems: 'center',
          background: tokens.glassStrong,
          color: tokens.text,
          fontSize: 12,
          fontWeight: 600,
        },
        style,
      )}
    >
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        children
      )}
    </div>
  ),
);

Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  overlap?: number;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ size = 36, overlap = -10, style, children, ...props }, ref) => {
    const items = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      const childType = child.type as { displayName?: string };
      const isAvatar = childType?.displayName === 'Avatar';

      const childStyle = {
        marginLeft: index === 0 ? 0 : overlap,
        border: `1px solid ${tokens.border}`,
      } as React.CSSProperties;

      return React.cloneElement(child, {
        style: mergeStyles(childStyle, (child.props as { style?: React.CSSProperties }).style),
        ...(isAvatar ? { size } : {}),
      } as Partial<AvatarProps>);
    });

    return (
      <div
        {...props}
        ref={ref}
        data-ui="avatar-group"
        style={mergeStyles({ display: 'flex', alignItems: 'center' }, style)}
      >
        {items}
      </div>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ style, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      data-ui="input"
      style={mergeStyles(
        {
          width: '100%',
          padding: '10px 12px',
          borderRadius: 12,
          border: `1px solid ${tokens.border}`,
          background: tokens.glass,
          color: tokens.text,
          fontSize: 14,
        },
        style,
      )}
    />
  ),
);

Input.displayName = 'Input';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ style, ...props }, ref) => (
    <textarea
      {...props}
      ref={ref}
      data-ui="textarea"
      style={mergeStyles(
        {
          width: '100%',
          padding: '10px 12px',
          borderRadius: 12,
          border: `1px solid ${tokens.border}`,
          background: tokens.glass,
          color: tokens.text,
          fontSize: 14,
          resize: 'vertical',
          minHeight: 96,
        },
        style,
      )}
    />
  ),
);

Textarea.displayName = 'Textarea';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ style, ...props }, ref) => (
    <select
      {...props}
      ref={ref}
      data-ui="select"
      style={mergeStyles(
        {
          width: '100%',
          padding: '10px 12px',
          borderRadius: 12,
          border: `1px solid ${tokens.border}`,
          background: tokens.glass,
          color: tokens.text,
          fontSize: 14,
        },
        style,
      )}
    />
  ),
);

Select.displayName = 'Select';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { checked, defaultChecked, onCheckedChange, style, children, onChange, ...props },
    ref,
  ) => {
    const [isChecked, setChecked] = useControllableState<boolean>({
      value: checked,
      defaultValue: defaultChecked ?? false,
      onChange: onCheckedChange,
    });

    const handleChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
      (event) => {
        onChange?.(event);
        if (event.defaultPrevented) {
          return;
        }
        setChecked(event.target.checked);
      },
      [onChange, setChecked],
    );

    return (
      <label
        data-ui="checkbox"
        style={mergeStyles(
          {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: tokens.text,
            fontSize: 14,
          },
          style,
        )}
      >
        <input
          {...props}
          ref={ref}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          style={{ accentColor: tokens.accent }}
        />
        {children}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { checked, defaultChecked, onCheckedChange, style, disabled, onClick, ...props },
    ref,
  ) => {
    const [isChecked, setChecked] = useControllableState<boolean>({
      value: checked,
      defaultValue: defaultChecked ?? false,
      onChange: onCheckedChange,
    });

    const handleClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      (event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) {
          return;
        }
        setChecked((current) => !current);
      },
      [disabled, onClick, setChecked],
    );

    return (
      <button
        {...props}
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        data-ui="switch"
        data-state={isChecked ? 'checked' : 'unchecked'}
        disabled={disabled}
        onClick={handleClick}
        style={mergeStyles(
          {
            position: 'relative',
            width: 46,
            height: 26,
            borderRadius: 999,
            border: `1px solid ${tokens.border}`,
            background: isChecked ? 'rgba(126, 224, 211, 0.4)' : tokens.glassStrong,
            padding: 3,
            cursor: disabled ? 'not-allowed' : 'pointer',
          },
          style,
        )}
      >
        <span
          style={{
            display: 'block',
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: tokens.text,
            transform: `translateX(${isChecked ? '20px' : '0'})`,
            transition: 'transform 0.2s ease',
          }}
        />
      </button>
    );
  },
);

Switch.displayName = 'Switch';

type RadioGroupContextValue = {
  value: string | undefined;
  setValue: (value: string) => void;
  name: string | undefined;
  disabled: boolean | undefined;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext(componentName: string) {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error(`${componentName} must be used within <RadioGroup>.`);
  }
  return context;
}

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, defaultValue, onValueChange, name, disabled, style, ...props }, ref) => {
    const [currentValue, setCurrentValue] = useControllableState<string>({
      value,
      defaultValue: defaultValue ?? '',
      onChange: onValueChange,
    });

    const contextValue = React.useMemo(
      () => ({
        value: currentValue,
        setValue: setCurrentValue,
        name,
        disabled,
      }),
      [currentValue, disabled, name, setCurrentValue],
    );

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          {...props}
          ref={ref}
          data-ui="radio-group"
          style={mergeStyles({ display: 'grid', gap: 10 }, style)}
        />
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export interface RadioItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(
  ({ value, style, children, disabled, onChange, ...props }, ref) => {
    const { value: selectedValue, setValue, name, disabled: groupDisabled } =
      useRadioGroupContext('RadioItem');
    const isChecked = selectedValue === value;

    const handleChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
      (event) => {
        onChange?.(event);
        if (!event.defaultPrevented) {
          setValue(event.target.value);
        }
      },
      [onChange, setValue],
    );

    return (
      <label
        data-ui="radio-item"
        style={mergeStyles(
          {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: tokens.text,
            fontSize: 14,
          },
          style,
        )}
      >
        <input
          {...props}
          ref={ref}
          type="radio"
          name={name}
          value={value}
          checked={isChecked}
          disabled={groupDisabled || disabled}
          onChange={handleChange}
          style={{ accentColor: tokens.accent }}
        />
        {children}
      </label>
    );
  },
);

RadioItem.displayName = 'RadioItem';

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string) {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error(`${componentName} must be used within <Tabs>.`);
  }
  return context;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ value, defaultValue, onValueChange, style, ...props }, ref) => {
    const [currentValue, setCurrentValue] = useControllableState<string>({
      value,
      defaultValue: defaultValue ?? '',
      onChange: onValueChange,
    });

    const contextValue = React.useMemo(
      () => ({
        value: currentValue,
        setValue: setCurrentValue,
      }),
      [currentValue, setCurrentValue],
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div {...props} ref={ref} data-ui="tabs" style={style} />
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = 'Tabs';

export type TabsListProps = React.HTMLAttributes<HTMLDivElement>;

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ style, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      role="tablist"
      data-ui="tabs-list"
      style={mergeStyles(
        {
          display: 'flex',
          gap: 8,
          padding: 6,
          borderRadius: 999,
          background: tokens.glassStrong,
          border: `1px solid ${tokens.border}`,
        },
        style,
      )}
    />
  ),
);

TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, style, onClick, ...props }, ref) => {
    const { value: activeValue, setValue } = useTabsContext('TabsTrigger');
    const isActive = activeValue === value;

    const handleClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setValue(value);
        }
      },
      [onClick, setValue, value],
    );

    return (
      <button
        {...props}
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-ui="tabs-trigger"
        data-state={isActive ? 'active' : 'inactive'}
        onClick={handleClick}
        style={mergeStyles(
          {
            padding: '8px 14px',
            borderRadius: 999,
            border: 'none',
            background: isActive ? tokens.glass : 'transparent',
            color: isActive ? tokens.text : tokens.muted,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
          },
          style,
        )}
      />
    );
  },
);

TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, style, ...props }, ref) => {
    const { value: activeValue } = useTabsContext('TabsContent');
    const isActive = activeValue === value;

    return (
      <div
        {...props}
        ref={ref}
        role="tabpanel"
        hidden={!isActive}
        data-ui="tabs-content"
        style={mergeStyles({ paddingTop: 12 }, style)}
      />
    );
  },
);

TabsContent.displayName = 'TabsContent';

export type AlertTone = 'info' | 'warning' | 'success';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ tone = 'info', style, ...props }, ref) => {
    const toneStyles: Record<AlertTone, React.CSSProperties> = {
      info: {
        background: tokens.glassStrong,
        border: `1px solid ${tokens.border}`,
        color: tokens.text,
      },
      warning: {
        background: 'rgba(244, 184, 96, 0.16)',
        border: '1px solid rgba(244, 184, 96, 0.28)',
        color: tokens.accentStrong,
      },
      success: {
        background: 'rgba(126, 224, 211, 0.18)',
        border: '1px solid rgba(126, 224, 211, 0.3)',
        color: tokens.mint,
      },
    };

    return (
      <div
        {...props}
        ref={ref}
        role="status"
        data-ui="alert"
        style={mergeStyles(
          {
            display: 'grid',
            gap: 6,
            padding: 14,
            borderRadius: 14,
            fontSize: 14,
          },
          mergeStyles(toneStyles[tone], style),
        )}
      />
    );
  },
);

Alert.displayName = 'Alert';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, max = 100, style, ...props }, ref) => {
    const clamped = Math.min(Math.max(value, 0), max);
    const percent = max === 0 ? 0 : (clamped / max) * 100;

    return (
      <div
        {...props}
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={clamped}
        data-ui="progress"
        style={mergeStyles(
          {
            position: 'relative',
            height: 12,
            borderRadius: 999,
            background: tokens.glassStrong,
            border: `1px solid ${tokens.border}`,
            overflow: 'hidden',
          },
          style,
        )}
      >
        <span
          style={{
            position: 'absolute',
            inset: 0,
            width: `${percent}%`,
            background: `linear-gradient(90deg, ${tokens.mint}, ${tokens.accent})`,
          }}
        />
      </div>
    );
  },
);

Progress.displayName = 'Progress';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ style, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      data-ui="skeleton"
      style={mergeStyles(
        {
          height: 14,
          borderRadius: 8,
          background:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0.08) 100%)',
        },
        style,
      )}
    />
  ),
);

Skeleton.displayName = 'Skeleton';

export type DividerProps = React.HTMLAttributes<HTMLHRElement>;

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ style, ...props }, ref) => (
    <hr
      {...props}
      ref={ref}
      data-ui="divider"
      style={mergeStyles(
        {
          border: 0,
          height: 1,
          background: tokens.border,
          width: '100%',
        },
        style,
      )}
    />
  ),
);

Divider.displayName = 'Divider';

export type BreadcrumbsProps = React.HTMLAttributes<HTMLElement>;

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ style, ...props }, ref) => (
    <nav
      {...props}
      ref={ref}
      aria-label="Breadcrumb"
      data-ui="breadcrumbs"
      style={mergeStyles({ fontSize: 12, color: tokens.subtle }, style)}
    />
  ),
);

Breadcrumbs.displayName = 'Breadcrumbs';

export type BreadcrumbItemProps = React.HTMLAttributes<HTMLSpanElement>;

export const BreadcrumbItem = React.forwardRef<HTMLSpanElement, BreadcrumbItemProps>(
  ({ style, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      data-ui="breadcrumb-item"
      style={mergeStyles({ color: tokens.text }, style)}
    />
  ),
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export type BreadcrumbSeparatorProps = React.HTMLAttributes<HTMLSpanElement>;

export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ style, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      aria-hidden="true"
      data-ui="breadcrumb-separator"
      style={mergeStyles({ margin: '0 6px', color: tokens.subtle }, style)}
    />
  ),
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export type PaginationProps = React.HTMLAttributes<HTMLElement>;

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ style, ...props }, ref) => (
    <nav
      {...props}
      ref={ref}
      aria-label="Pagination"
      data-ui="pagination"
      style={mergeStyles({ display: 'flex', gap: 8, alignItems: 'center' }, style)}
    />
  ),
);

Pagination.displayName = 'Pagination';

export type PaginationItemProps = React.HTMLAttributes<HTMLSpanElement>;

export const PaginationItem = React.forwardRef<HTMLSpanElement, PaginationItemProps>(
  ({ style, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      data-ui="pagination-item"
      style={mergeStyles({ display: 'inline-flex' }, style)}
    />
  ),
);

PaginationItem.displayName = 'PaginationItem';

export interface PaginationLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ active = false, style, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      type="button"
      data-ui="pagination-link"
      data-state={active ? 'active' : 'inactive'}
      aria-current={active ? 'page' : undefined}
      style={mergeStyles(
        {
          padding: '6px 12px',
          borderRadius: 999,
          border: `1px solid ${tokens.border}`,
          background: active ? tokens.glass : 'transparent',
          color: active ? tokens.text : tokens.subtle,
          cursor: 'pointer',
        },
        style,
      )}
    />
  ),
);

PaginationLink.displayName = 'PaginationLink';

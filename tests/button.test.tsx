import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../src/components/button';

describe('Button', () => {
  it('renders a native button with type="button" by default', () => {
    render(<Button>Press me</Button>);

    expect(screen.getByRole('button', { name: 'Press me' })).toHaveAttribute('type', 'button');
  });

  it('supports uncontrolled toggle state', async () => {
    const user = userEvent.setup();
    render(
      <Button toggle defaultPressed={false}>
        Toggle
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Toggle' });

    expect(button).toHaveAttribute('aria-pressed', 'false');

    await user.click(button);

    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('supports controlled toggle state and emits changes', async () => {
    const user = userEvent.setup();
    const handlePressedChange = vi.fn();

    function ControlledButton() {
      const [pressed, setPressed] = React.useState(false);

      return (
        <Button
          toggle
          pressed={pressed}
          onPressedChange={(nextValue) => {
            handlePressedChange(nextValue);
            setPressed(nextValue);
          }}
        >
          Controlled
        </Button>
      );
    }

    render(<ControlledButton />);

    const button = screen.getByRole('button', { name: 'Controlled' });
    await user.click(button);

    expect(handlePressedChange).toHaveBeenCalledWith(true);
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });
});

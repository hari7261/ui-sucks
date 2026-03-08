import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ToastProvider, ToastViewport, useToast } from '../src/components/toast';

function ToastDemo({ duration = 1000 }: { duration?: number }) {
  const { push } = useToast();

  return (
    <>
      <button
        type="button"
        onClick={() =>
          push({
            title: 'Saved',
            description: 'Profile updated',
            duration,
          })
        }
      >
        Show toast
      </button>
      <button
        type="button"
        onClick={() =>
          push({
            id: 'sync',
            title: 'First',
            duration,
          })
        }
      >
        Show first sync toast
      </button>
      <button
        type="button"
        onClick={() =>
          push({
            id: 'sync',
            title: 'Second',
            duration,
          })
        }
      >
        Replace sync toast
      </button>
      <ToastViewport />
    </>
  );
}

afterEach(() => {
  vi.useRealTimers();
});

describe('Toast', () => {
  it('renders pushed toast content and dismisses it after its duration', async () => {
    vi.useFakeTimers();

    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Show toast' }));

    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Profile updated')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });

  it('replacing a toast with the same id resets its lifecycle', async () => {
    vi.useFakeTimers();

    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Show first sync toast' }));
    expect(screen.getByText('First')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(900);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Replace sync toast' }));

    expect(screen.queryByText('First')).not.toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByText('Second')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(screen.queryByText('Second')).not.toBeInTheDocument();
  });

  it('pauses dismissal while the toast is hovered and resumes afterwards', async () => {
    vi.useFakeTimers();

    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Show toast' }));

    const toast = screen.getByText('Saved').closest('[data-toast-id="toast-1"]');
    expect(toast).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    fireEvent.pointerEnter(toast!);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText('Saved')).toBeInTheDocument();

    fireEvent.pointerLeave(toast!);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });
});

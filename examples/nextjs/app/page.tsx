'use client';

import * as React from 'react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  ToastProvider,
  ToastViewport,
  useToast,
} from 'ui-sucks';

function Demo() {
  const { push } = useToast();
  const [open, setOpen] = React.useState(false);

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '56px 20px',
      }}
    >
      <section
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: 32,
          borderRadius: 28,
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          boxShadow: '0 28px 80px rgba(22, 33, 39, 0.14)',
        }}
      >
        <p
          style={{
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            fontSize: 12,
            color: '#126270',
          }}
        >
          ui-sucks
        </p>
        <h1
          style={{
            margin: '12px 0 16px',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            lineHeight: 1,
          }}
        >
          Production-grade, style-agnostic React UI primitives.
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: 600,
            lineHeight: 1.7,
            color: '#3d5059',
          }}
        >
          This example intentionally styles the library from the outside. The exported components
          only provide state, accessibility, and composition.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            marginTop: 24,
          }}
        >
          <Button
            style={primaryButtonStyle}
            onClick={() =>
              push({
                content: (
                  <div style={toastStyle}>
                    <strong>Deployment queued</strong>
                    <span>The release pipeline has started.</span>
                  </div>
                ),
              })
            }
          >
            Show toast
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger style={primaryButtonStyle}>Open dialog</DialogTrigger>
            <DialogContent aria-label="Release dialog" portalled style={dialogStyle}>
              <DialogTitle style={{ margin: 0, fontSize: 24 }}>Release checklist</DialogTitle>
              <DialogDescription style={{ margin: '12px 0 0', color: '#3d5059' }}>
                Keep the surface area small, the types strict, and the markup accessible.
              </DialogDescription>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginTop: 24,
                }}
              >
                <Button style={primaryButtonStyle}>Approve</Button>
                <DialogClose style={secondaryButtonStyle}>Dismiss</DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <ToastViewport
        style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          display: 'grid',
          gap: 12,
          width: 'min(92vw, 320px)',
        }}
      />
    </main>
  );
}

export default function Page() {
  return (
    <ToastProvider defaultDuration={3500}>
      <Demo />
    </ToastProvider>
  );
}

const primaryButtonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: 999,
  padding: '12px 18px',
  backgroundColor: '#126270',
  color: '#fff',
  fontWeight: 700,
  cursor: 'pointer',
};

const secondaryButtonStyle: React.CSSProperties = {
  ...primaryButtonStyle,
  backgroundColor: '#d9e6e8',
  color: '#152127',
};

const dialogStyle: React.CSSProperties = {
  position: 'fixed',
  inset: '50% auto auto 50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(92vw, 420px)',
  padding: 24,
  borderRadius: 20,
  backgroundColor: '#fff',
  boxShadow: '0 30px 80px rgba(18, 31, 36, 0.22)',
};

const toastStyle: React.CSSProperties = {
  display: 'grid',
  gap: 6,
  padding: 16,
  borderRadius: 16,
  backgroundColor: '#152127',
  color: '#fff',
};

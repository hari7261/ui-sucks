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

function Playground() {
  const { push } = useToast();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <main style={pageStyle}>
      <section style={panelStyle}>
        <p style={eyebrowStyle}>ui-sucks</p>
        <h1 style={titleStyle}>Headless primitives with production tooling.</h1>
        <p style={bodyStyle}>
          The library ships unstyled components. This example adds plain inline styles to prove the
          package stays out of your design system.
        </p>

        <div style={stackStyle}>
          <Button
            toggle
            style={buttonStyle}
            onPressedChange={(pressed) => {
              if (pressed) {
                push({
                  content: (
                    <div style={toastCardStyle}>
                      <strong>Saved</strong>
                      <span>Your changes are now persisted.</span>
                    </div>
                  ),
                });
              }
            }}
          >
            Toggle save state
          </Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger style={buttonStyle}>Open dialog</DialogTrigger>
            <DialogContent
              aria-label="Example dialog"
              portalled
              style={dialogStyle}
            >
              <DialogTitle style={dialogTitleStyle}>System notice</DialogTitle>
              <DialogDescription style={dialogDescriptionStyle}>
                Keyboard navigation, focus trapping, and outside-click dismissal are all active.
              </DialogDescription>
              <div style={stackStyle}>
                <Button style={buttonStyle}>Primary action</Button>
                <DialogClose style={secondaryButtonStyle}>Close</DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <ToastViewport style={toastViewportStyle} />
    </main>
  );
}

export default function App() {
  return (
    <ToastProvider defaultDuration={3500}>
      <Playground />
    </ToastProvider>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  margin: 0,
  padding: '48px 20px',
  fontFamily: '"IBM Plex Sans", "Segoe UI", sans-serif',
  background:
    'radial-gradient(circle at top left, rgba(0, 121, 140, 0.18), transparent 28%), linear-gradient(135deg, #f6f1e8 0%, #efe7d8 100%)',
  color: '#182026',
};

const panelStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: '0 auto',
  padding: 32,
  borderRadius: 24,
  backgroundColor: 'rgba(255, 255, 255, 0.86)',
  boxShadow: '0 24px 70px rgba(24, 32, 38, 0.12)',
};

const eyebrowStyle: React.CSSProperties = {
  margin: 0,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  fontSize: 12,
  color: '#0d6773',
};

const titleStyle: React.CSSProperties = {
  margin: '12px 0 16px',
  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
  lineHeight: 1.05,
};

const bodyStyle: React.CSSProperties = {
  margin: 0,
  maxWidth: 560,
  lineHeight: 1.6,
  color: '#31424d',
};

const stackStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  marginTop: 24,
};

const buttonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: 999,
  padding: '12px 18px',
  backgroundColor: '#0d6773',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
};

const secondaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#dce8eb',
  color: '#182026',
};

const dialogStyle: React.CSSProperties = {
  position: 'fixed',
  inset: '50% auto auto 50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(92vw, 420px)',
  borderRadius: 20,
  padding: 24,
  backgroundColor: '#fff',
  boxShadow: '0 32px 80px rgba(18, 28, 31, 0.24)',
};

const dialogTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 24,
};

const dialogDescriptionStyle: React.CSSProperties = {
  margin: '12px 0 0',
  lineHeight: 1.5,
  color: '#465963',
};

const toastViewportStyle: React.CSSProperties = {
  position: 'fixed',
  right: 20,
  bottom: 20,
  display: 'grid',
  gap: 12,
  width: 'min(92vw, 320px)',
};

const toastCardStyle: React.CSSProperties = {
  display: 'grid',
  gap: 6,
  padding: 16,
  borderRadius: 16,
  backgroundColor: '#182026',
  color: '#fff',
  boxShadow: '0 18px 36px rgba(24, 32, 38, 0.2)',
};

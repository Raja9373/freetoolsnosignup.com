import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error?.message || 'An unexpected error occurred.' };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Applet ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#0A1931', color: '#FFFEF7', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: '600px', backgroundColor: '#0F2340', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '16px', padding: '32px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
            <h1 style={{ color: '#D4AF37', margin: '0 0 16px 0', fontSize: '24px' }}>FreeToolsNoSignup - Recovery Mode</h1>
            <p style={{ color: '#E2E8F0', fontSize: '14px', lineHeight: '1.6' }}>
              We encountered an issue initializing the tool suite. Click below to reload and restore session.
            </p>
            {this.state.errorMessage && (
              <pre style={{ background: '#071326', padding: '12px', borderRadius: '8px', color: '#F87171', fontSize: '12px', overflowX: 'auto', textAlign: 'left', marginTop: '16px', marginBottom: '20px' }}>
                {this.state.errorMessage}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{ background: '#D4AF37', color: '#0A1931', fontWeight: 'bold', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

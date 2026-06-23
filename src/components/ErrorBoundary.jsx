import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A', color: '#F5F0E8', fontFamily: 'Inter, sans-serif' }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h1>
            <p style={{ color: '#888', marginBottom: '2rem' }}>Please refresh the page</p>
            <button onClick={() => window.location.reload()} style={{ background: '#C9A84C', color: '#0A0A0A', border: 'none', padding: '12px 32px', borderRadius: '9999px', fontWeight: 600, cursor: 'pointer' }}>
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

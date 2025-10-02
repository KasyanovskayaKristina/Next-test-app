'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}>
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '600px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#dc2626',
              marginBottom: '1rem',
            }}>
              Что-то пошло не так
            </h1>
            
            <p style={{
              color: '#4b5563',
              marginBottom: '1rem',
              lineHeight: '1.6',
            }}>
              Произошла непредвиденная ошибка. Мы уже работаем над её исправлением.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                background: '#fee2e2',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                fontSize: '0.875rem',
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
                  Детали ошибки (только в dev режиме)
                </summary>
                <pre style={{
                  marginTop: '0.5rem',
                  overflow: 'auto',
                  fontSize: '0.75rem',
                }}>
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={this.handleReset}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Попробовать снова
              </button>
              
              <Link
                href="/"
                style={{
                  background: '#6b7280',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'inline-block',
                }}
              >
                На главную
              </Link>
            </div>

            <p style={{
              marginTop: '1.5rem',
              fontSize: '0.875rem',
              color: '#6b7280',
            }}>
              Tip: Обновите страницу или попробуйте позже
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


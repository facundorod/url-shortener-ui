'use client';

import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(51, 65, 85, 0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease',
    }}>
      <div className="container-full">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          alignItems: 'center',
          height: '4rem',
          padding: '0 var(--spacing-6)',
          gap: 'var(--spacing-4)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
            <Link href="/" style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: '700',
              color: '#ffffff',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              letterSpacing: '-0.025em',
              padding: '0.5rem 0',
            }}
            onMouseOver={e => (e.currentTarget.style.color = '#3b82f6')}
            onMouseOut={e => (e.currentTarget.style.color = '#ffffff')}
            >
              ShortLink
            </Link>
          </div>
          
          <nav className="nav-desktop" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '2rem',
          }}>
            {isAuthenticated && (
              <Link href="/urls" style={{
                color: '#cbd5e1',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '500',
                textDecoration: 'none',
                padding: '0.5rem 0',
                transition: 'color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseOver={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseOut={e => (e.currentTarget.style.color = '#cbd5e1')}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinejoin="round"/>
                </svg>
                My URLs
              </Link>
            )}
          </nav>
          
          <div className="nav-desktop" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '1rem',
          }}>
            {isAuthenticated ? (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} ref={dropdownRef}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    color: '#cbd5e1',
                    transition: 'all 0.2s ease',
                    gap: '0.5rem',
                  }}
                  onClick={() => setDropdownOpen(v => !v)}
                  onMouseOver={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '600',
                  }}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ 
                    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}>
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                
                {dropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '3rem',
                    right: 0,
                    minWidth: '200px',
                    background: '#334155',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                    padding: '0.5rem 0',
                    zIndex: 100,
                  }}>
                    <div style={{
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
                      marginBottom: '0.5rem',
                    }}>
                      <div style={{
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: '600',
                        color: '#ffffff',
                        marginBottom: '0.25rem',
                      }}>
                        {user?.name || 'User'}
                      </div>
                      <div style={{
                        fontSize: 'var(--font-size-sm)',
                        color: '#cbd5e1',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {user?.email}
                      </div>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        color: '#cbd5e1',
                        fontWeight: '500',
                        fontSize: 'var(--font-size-sm)',
                        padding: '0.5rem 1rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = '#cbd5e1';
                      }}
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="16,17 21,12 16,7" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Link href="/auth/login" style={{
                  color: '#cbd5e1',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '500',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#cbd5e1';
                }}
                >
                  Sign In
                </Link>
                <Link href="/auth/register" style={{
                  background: '#3b82f6',
                  color: '#fff',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '500',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  display: 'inline-block',
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#2563eb')}
                onMouseOut={e => (e.currentTarget.style.background = '#3b82f6')}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          <div className="nav-mobile" style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            gridColumn: '3'
          }}>
            <button
              style={{
                borderRadius: '0.5rem',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                color: '#cbd5e1',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#cbd5e1';
              }}
              aria-label="Open menu"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
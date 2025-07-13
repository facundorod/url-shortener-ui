import Link from 'next/link';

export default function Navbar() {
  return (
    <header style={{ 
      background: 'var(--card)', 
      borderBottom: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container-full">
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          alignItems: 'center',
          height: '4.5rem',
          padding: '0 var(--spacing-6)',
          gap: 'var(--spacing-4)'
        }}>
          {/* Logo - Left Section */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
            <Link href="/" style={{ 
              fontSize: 'var(--font-size-2xl)', 
              fontWeight: 'bold',
              color: 'var(--primary)',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}>
              ShortLink
            </Link>
          </div>
          
          {/* Desktop Navigation - Center Section */}
          <nav className="nav-desktop" style={{ 
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-2)'
          }}>
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/urls" className="nav-link">
              URLs
            </Link>
        
          </nav>

          {/* Right Section - Sign In Button */}
          <div className="nav-desktop" style={{ 
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
            <Link href="/login" className="btn btn-primary btn-sm">
              Sign In
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="nav-mobile" style={{ 
            alignItems: 'center',
            justifyContent: 'flex-end',
            gridColumn: '3'
          }}>
            <button className="btn btn-secondary btn-sm">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
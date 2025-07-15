import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--muted)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 'var(--spacing-4)'
    }}>
      <div className="container-primary">
        <div className="card card-padding" style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
          
          {/* 404 Number */}
          <h1 style={{ 
            fontSize: '4rem', 
            fontWeight: '700', 
            color: 'var(--foreground)', 
            marginBottom: 'var(--spacing-3)',
            lineHeight: '1'
          }}>
            404
          </h1>

          {/* Main Message */}
          <h2 style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: '600',
            color: 'var(--foreground)',
            marginBottom: 'var(--spacing-4)'
          }}>
            Page Not Found
          </h2>

          {/* Detailed Explanation */}
          <p style={{ 
            color: 'var(--muted-foreground)', 
            fontSize: 'var(--font-size-base)', 
            marginBottom: 'var(--spacing-6)',
            lineHeight: 'var(--line-height-relaxed)'
          }}>
            The page you&apos;re looking for doesn&apos;t exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'var(--spacing-3)',
            marginBottom: 'var(--spacing-6)'
          }}>
            <Link href="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link href="/urls" className="btn btn-secondary">
              View My URLs
            </Link>
          </div>

          {/* Helpful Suggestions */}
          <div style={{ 
            borderTop: '1px solid var(--border)',
            paddingTop: 'var(--spacing-4)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--muted-foreground)'
          }}>
            <p style={{ marginBottom: 'var(--spacing-2)' }}>
              <strong>What you can do:</strong>
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: '0', 
              margin: '0',
              textAlign: 'left',
              display: 'inline-block'
            }}>
              <li style={{ marginBottom: 'var(--spacing-1)' }}>
                • Check the URL for typos
              </li>
              <li style={{ marginBottom: 'var(--spacing-1)' }}>
                • Go back to the previous page
              </li>
              <li style={{ marginBottom: 'var(--spacing-1)' }}>
                • Visit our homepage to start fresh
              </li>
              <li>
                • Contact support if you think this is an error
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

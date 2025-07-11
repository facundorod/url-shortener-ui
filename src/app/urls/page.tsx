'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCreateUrl } from '@/hooks/useCreateUrl';

// Mock data based on the URL entity structure
const mockUrls = [
  {
    id: 1,
    shortUrl: 'https://short.ly/abc123',
    originalUrl: 'https://www.example.com/very-long-url-that-needs-to-be-shortened',
    createdBy: { id: 1, name: 'John Doe', email: 'john@example.com' },
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z'),
    expiresAt: new Date('2024-07-15T10:30:00Z'),
  },
  {
    id: 2,
    shortUrl: 'https://short.ly/def456',
    originalUrl: 'https://github.com/username/awesome-project-repository',
    createdBy: { id: 1, name: 'John Doe', email: 'john@example.com' },
    createdAt: new Date('2024-01-10T14:20:00Z'),
    updatedAt: new Date('2024-01-10T14:20:00Z'),
    expiresAt: undefined,
  },
  {
    id: 3,
    shortUrl: 'https://short.ly/ghi789',
    originalUrl: 'https://docs.google.com/presentation/d/1234567890abcdef/edit',
    createdBy: { id: 1, name: 'John Doe', email: 'john@example.com' },
    createdAt: new Date('2024-01-05T09:15:00Z'),
    updatedAt: new Date('2024-01-05T09:15:00Z'),
    expiresAt: new Date('2024-06-05T09:15:00Z'),
  },
  {
    id: 4,
    shortUrl: 'https://short.ly/jkl012',
    originalUrl: 'https://medium.com/@author/understanding-modern-web-development-best-practices',
    createdBy: { id: 1, name: 'John Doe', email: 'john@example.com' },
    createdAt: new Date('2024-01-02T16:45:00Z'),
    updatedAt: new Date('2024-01-02T16:45:00Z'),
    expiresAt: undefined,
  },
  {
    id: 5,
    shortUrl: 'https://short.ly/mno345',
    originalUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    createdBy: { id: 1, name: 'John Doe', email: 'john@example.com' },
    createdAt: new Date('2023-12-28T11:00:00Z'),
    updatedAt: new Date('2023-12-28T11:00:00Z'),
    expiresAt: new Date('2024-12-28T11:00:00Z'),
  }
];

export default function UrlsPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [newUrl, setNewUrl] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { createNewUrl, isLoading, error, result, reset } = useCreateUrl();

  const handleCopyUrl = async (shortUrl: string, id: number) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleCreateUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const createdUrl = await createNewUrl(newUrl);
    if (createdUrl) {
      setNewUrl('');
      setShowCreateForm(false);
      // TODO: Add the new URL to the list
    }
  };

  const handleToggleForm = () => {
    setShowCreateForm(!showCreateForm);
    if (!showCreateForm) {
      reset();
      setNewUrl('');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };



  const truncateUrl = (url: string, maxLength: number = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  return (
    <div className="section-spacing" style={{ background: 'var(--muted)' }}>
      <div className="container-full">
        {/* Header */}
        <div className="card card-padding" style={{ marginBottom: 'var(--spacing-6)' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: 'var(--spacing-4)'
          }}>
            <div>
              <h1 style={{ 
                fontSize: 'var(--font-size-3xl)', 
                fontWeight: 'bold',
                color: 'var(--foreground)',
                marginBottom: 'var(--spacing-2)'
              }}>
                Your URLs
              </h1>
              <p className="text-muted" style={{ margin: 0 }}>
                Manage and track all your shortened URLs
              </p>
            </div>
            <button onClick={handleToggleForm} className="btn btn-primary">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {showCreateForm ? 'Cancel' : 'Create New URL'}
            </button>
          </div>

          
        </div>

        {/* Create URL Form */}
        {showCreateForm && (
          <div className="card card-padding" style={{ marginBottom: 'var(--spacing-6)' }}>
            <h2 style={{ 
              fontSize: 'var(--font-size-xl)', 
              fontWeight: '600',
              marginBottom: 'var(--spacing-4)'
            }}>
              Create New Short URL
            </h2>
            
            <form onSubmit={handleCreateUrl} style={{ marginBottom: 'var(--spacing-4)' }}>
              <div className="form-group">
                <label className="form-label">Enter URL to shorten</label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://example.com/your-long-url"
                  className="form-input"
                  disabled={isLoading}
                  required
                />
              </div>
              
              {error && (
                <div style={{ 
                  color: 'var(--destructive)', 
                  fontSize: 'var(--font-size-sm)',
                  marginBottom: 'var(--spacing-4)'
                }}>
                  {error}
                </div>
              )}
              
              {result && (
                <div style={{ 
                  padding: 'var(--spacing-4)', 
                  background: 'var(--muted)',
                  borderRadius: 'var(--radius)',
                  marginBottom: 'var(--spacing-4)'
                }}>
                  <div style={{ marginBottom: 'var(--spacing-2)' }}>
                    <strong>Success! Your short URL:</strong>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--spacing-2)'
                  }}>
                    <Link 
                      href={result.shortUrl} 
                      target="_blank"
                      style={{ 
                        color: 'var(--primary)', 
                        fontWeight: '500',
                        textDecoration: 'none'
                      }}
                    >
                      {result.shortUrl}
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(result.shortUrl, 0)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 'var(--spacing-1)',
                        cursor: 'pointer',
                        color: 'var(--primary)',
                        borderRadius: 'var(--radius)'
                      }}
                      title="Copy URL"
                    >
                      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              <div className="btn-group">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isLoading || !newUrl.trim()}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      Creating...
                    </>
                  ) : (
                    'Create Short URL'
                  )}
                </button>
                <button 
                  type="button" 
                  onClick={handleToggleForm}
                  className="btn btn-secondary"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* URLs List */}
        <div className="card">
          <div className="card-padding" style={{ paddingBottom: 0 }}>
            <h2 style={{ 
              fontSize: 'var(--font-size-xl)', 
              fontWeight: '600',
              marginBottom: 'var(--spacing-4)'
            }}>
              All URLs
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {mockUrls.map((url, index) => (
              <div key={url.id} className="list-item" style={{ 
                borderBottom: index === mockUrls.length - 1 ? 'none' : `1px solid var(--border)`
              }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr auto',
                  gap: 'var(--spacing-4)',
                  alignItems: 'center'
                }}>
                  {/* URL Information */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 'var(--spacing-2)',
                      marginBottom: 'var(--spacing-2)'
                    }}>
                      <Link 
                        href={url.shortUrl} 
                        target="_blank"
                        style={{ 
                          color: 'var(--primary)', 
                          fontWeight: '500',
                          textDecoration: 'none'
                        }}
                      >
                        {url.shortUrl}
                      </Link>
                      <button
                        onClick={() => handleCopyUrl(url.shortUrl, url.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 'var(--spacing-1)',
                          cursor: 'pointer',
                          color: copiedId === url.id ? 'var(--primary)' : 'var(--muted-foreground)',
                          borderRadius: 'var(--radius)',
                          transition: 'color 0.2s ease'
                        }}
                        title="Copy URL"
                      >
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {copiedId === url.id ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          )}
                        </svg>
                      </button>
                    </div>
                    
                    <div className="text-muted text-sm" style={{ marginBottom: 'var(--spacing-2)' }}>
                      {truncateUrl(url.originalUrl, 60)}
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 'var(--spacing-4)',
                      fontSize: 'var(--font-size-sm)'
                    }}>
                      <div className="text-muted">
                        Created: {formatDate(url.createdAt)}
                      </div>
                      {url.expiresAt && (
                        <div className="text-muted">
                          Expires: {formatDate(url.expiresAt)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--spacing-2)'
                  }}>
                  
                    <Link href={`/urls/${url.id}/edit`} className="btn btn-secondary btn-sm">
                      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <button className="btn btn-secondary btn-sm" style={{ color: 'var(--destructive)' }}>
                      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
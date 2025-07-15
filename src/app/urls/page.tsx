'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateUrl } from '@/hooks/useCreateUrl';
import { useUrls } from '@/hooks/useUrls';
import { useToast } from '@/components/toast-container';
import { deleteUrl } from '@/lib/services/urls.service';
import { useAuth } from '@/contexts/AuthContext';
import { Url } from '@/lib/models/url.model';

export default function UrlsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [newUrl, setNewUrl] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { createNewUrl, isLoading, error, result, reset } = useCreateUrl();
  const { urls, isLoading: urlsLoading, error: urlsError, refetch } = useUrls(isAuthenticated && !authLoading);
  const { showToast } = useToast();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="container-primary section-spacing">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="text-muted mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleCopyUrl = async (shortUrl: string, id: number) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      showToast('URL copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy URL:', err);
      showToast('Failed to copy URL. Please try again.', 'error');
    }
  };

  const handleDeleteUrl = async (id: number, shortUrl: string) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete this URL?\n\n${shortUrl}\n\nThis action cannot be undone.`
    );
    
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteUrl(id.toString());
      
      // Refresh the URLs list after deletion
      await refetch();
      
      showToast('URL deleted successfully!', 'success');
    } catch (err) {
      console.error('Failed to delete URL:', err);
      showToast('Failed to delete URL. Please try again.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreateUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const createdUrl = await createNewUrl(newUrl);
    if (createdUrl) {
      setNewUrl('');
      // Refresh the URLs list after creating a new one
      refetch();
    }
  };

  const handleToggleForm = () => {
    setShowCreateForm(!showCreateForm);
    if (!showCreateForm) {
      reset();
      setNewUrl('');
    } else {
      // When hiding the form, also reset everything
      reset();
      setNewUrl('');
    }
  };

  const handleCreateAnother = () => {
    reset();
    setNewUrl('');
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
    <div className="section-spacing">
      <div className="container-full">
        {/* Header */}
        <div className="urls-header">
          <div className="urls-header-content">
            <div className="urls-header-text">
              <h1 className="urls-title">Your URLs</h1>
              <p className="urls-subtitle">Manage and track all your shortened URLs</p>
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
                  background: '#f0f9ff',
                  borderRadius: 'var(--radius)',
                  marginBottom: 'var(--spacing-4)',
                  border: '1px solid #0ea5e9'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-3)'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: '#10b981' }}>
                      <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <strong style={{ color: '#0369a1' }}>URL Created Successfully!</strong>
                  </div>
                  
                  <div style={{ marginBottom: 'var(--spacing-3)' }}>
                    <div style={{ 
                      fontSize: 'var(--font-size-sm)', 
                      color: '#64748b',
                      marginBottom: 'var(--spacing-1)'
                    }}>
                      Your short URL:
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 'var(--spacing-2)',
                      padding: 'var(--spacing-3)',
                      background: 'white',
                      borderRadius: 'var(--radius)',
                      border: '1px solid #e2e8f0'
                    }}>
                      <Link 
                        href={result.shortUrl} 
                        target="_blank"
                        style={{ 
                          color: 'var(--primary)', 
                          fontWeight: '500',
                          textDecoration: 'none',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--font-size-base)',
                          flex: 1
                        }}
                      >
                        {result.shortUrl}
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(result.shortUrl, 0)}
                        className="btn btn-sm btn-primary"
                        title="Copy URL"
                      >
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ 
                    fontSize: 'var(--font-size-sm)', 
                    color: '#64748b'
                  }}>
                    <strong>Original URL:</strong> {result.originalUrl}
                  </div>
                </div>
              )}
              
              <div className="btn-group">
                {result ? (
                  <button 
                    type="button" 
                    onClick={handleCreateAnother}
                    className="btn btn-primary"
                  >
                    Create Another URL
                  </button>
                ) : (
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
                )}
                <button 
                  type="button" 
                  onClick={handleToggleForm}
                  className="btn btn-secondary"
                  disabled={isLoading}
                >
                  {result ? 'Done' : 'Cancel'}
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
              All URLs ({urls?.length || 0})
            </h2>
          </div>

          {urlsLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <div>Loading URLs...</div>
            </div>
          ) : urlsError ? (
            <div className="error-state">
              <div>Error loading URLs: {urlsError}</div>
              <button onClick={refetch} className="btn btn-secondary">
                Try Again
              </button>
            </div>
          ) : !urls || urls.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg className="icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div className="empty-state-title">No URLs yet</div>
              <div className="empty-state-description">
                Create your first short URL to get started managing your links.
              </div>
              <button onClick={() => setShowCreateForm(true)} className="btn btn-primary">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First URL
              </button>
            </div>
          ) : (
            <div className="urls-list">
              {urls?.map((url: Url, index: number) => (
              <div key={url.id} className="list-item" style={{ 
                borderBottom: index === urls.length - 1 ? 'none' : `1px solid var(--border)`
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
                        className="url-short-link"
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
                    
                    <div className="url-original" style={{ marginBottom: 'var(--spacing-3)' }}>
                      {truncateUrl(url.originalUrl, 80)}
                    </div>
                    
                    <div className="url-meta">
                      <div className="url-meta-item">
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                                                 {formatDate(new Date(url.createdAt))}
                      </div>
                      {url.expiresAt && (
                        <div className="url-meta-item">
                          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                                                     Expires {formatDate(new Date(url.expiresAt))}
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
                  
                    <button 
                      className="btn btn-secondary btn-sm" 
                      style={{ color: 'var(--destructive)' }}
                      onClick={() => handleDeleteUrl(url.id, url.shortUrl)}
                      disabled={deletingId === url.id}
                    >
                      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {deletingId === url.id ? (
                        <div className="spinner"></div>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
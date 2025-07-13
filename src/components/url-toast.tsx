'use client';

import { useEffect, useState } from 'react';

export interface UrlToastProps {
  shortUrl: string;
  onClose: () => void;
  duration?: number;
}

export default function UrlToast({ shortUrl, onClose, duration = 6000 }: UrlToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className={`toast ${isVisible ? 'toast-visible' : 'toast-hidden'} toast-success`}>
      <div className="url-toast-content">
        <div className="url-toast-header">
          <div className="toast-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="url-toast-title">Short URL Created!</span>
          <button onClick={handleClose} className="toast-close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="url-toast-url-section">
          <div className="url-toast-url">{shortUrl}</div>
          <button 
            onClick={handleCopy} 
            className={`url-toast-copy-btn ${copied ? 'copied' : ''}`}
            title={copied ? 'Copied!' : 'Copy URL'}
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.333 4L6 11.333 2.667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.333 6H4a1.333 1.333 0 00-1.333 1.333v5.334A1.333 1.333 0 004 14h5.333a1.333 1.333 0 001.334-1.333V11.333M7.333 2H12a1.333 1.333 0 011.333 1.333V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
} 
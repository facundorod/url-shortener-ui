'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Toast from './toast';
import UrlToast from './url-toast';

interface ToastData {
  id: string;
  message?: string;
  type: 'success' | 'error' | 'info' | 'url';
  duration?: number;
  shortUrl?: string;
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
  showUrlToast: (shortUrl: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success', duration = 4000) => {
    const id = Date.now().toString();
    const newToast: ToastData = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
  }, []);

  const showUrlToast = useCallback((shortUrl: string, duration = 6000) => {
    const id = Date.now().toString();
    const newToast: ToastData = { id, type: 'url', shortUrl, duration };
    
    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, showUrlToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => {
          if (toast.type === 'url' && toast.shortUrl) {
            return (
              <UrlToast
                key={toast.id}
                shortUrl={toast.shortUrl}
                duration={toast.duration}
                onClose={() => removeToast(toast.id)}
              />
            );
          }
          
          return (
            <Toast
              key={toast.id}
              message={toast.message || ''}
              type={toast.type as 'success' | 'error' | 'info'}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          );
        })}
      </div>
    </ToastContext.Provider>
  );
} 
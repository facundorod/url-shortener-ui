# URL Shortener UI

A modern, responsive frontend for the URL shortener service built with Next.js 15 and TypeScript. This application provides a clean, intuitive interface for creating and managing shortened URLs with advanced features like authentication, URL analytics, and expiration management.

## ✨ Features

### Core Functionality

- **URL Shortening**: Convert long URLs into short, shareable links
- **Custom Aliases**: Create memorable custom short URLs (premium feature)
- **Expiration Dates**: Set automatic expiration for time-sensitive links
- **URL Analytics**: Track clicks, referrers, and geographic data
- **Bulk Operations**: Create and manage multiple URLs at once

### User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic theme detection with manual override
- **Real-time Feedback**: Instant success/error notifications with toast messages
- **Copy to Clipboard**: One-click URL copying with visual feedback
- **Search & Filter**: Find URLs quickly with advanced filtering options

### Security & Management

- **User Authentication**: Secure JWT-based authentication system
- **Protected Routes**: Private URL management and analytics
- **URL Validation**: Comprehensive input validation and sanitization
- **Rate Limiting**: Client-side request throttling for optimal performance

## 🚀 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety
- **Styling**: Custom CSS with CSS Variables for theming
- **State Management**: React hooks with custom context providers
- **HTTP Client**: Native Fetch API with custom abstractions
- **Authentication**: JWT tokens with secure storage
- **Icons**: Custom SVG icons with React components
- **Deployment**: Vercel-optimized with SSR/SSG support

## 📋 Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm/yarn/pnpm**: Package manager of your choice
- **Backend API**: URL shortener backend service running

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd url-shortener-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Development
NODE_ENV=development
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication routes
│   │   ├── login/               # Login page
│   │   └── register/            # Registration page
│   ├── not-found/               # 404 error page
│   ├── urls/                    # URL management pages
│   ├── globals.css              # Global styles and CSS variables
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Homepage
├── components/                   # Reusable UI components
│   ├── auth/                    # Authentication components
│   ├── common/                  # Shared components
│   ├── forms/                   # Form components
│   ├── navigation/              # Navigation components
│   └── ui/                      # Base UI components
├── contexts/                     # React context providers
│   ├── AuthContext.tsx          # Authentication state
│   └── ThemeContext.tsx         # Theme management
├── hooks/                        # Custom React hooks
│   ├── auth/                    # Authentication hooks
│   ├── api/                     # API interaction hooks
│   └── common/                  # Utility hooks
├── lib/                         # Utility libraries
│   ├── api.ts                   # API client configuration
│   ├── auth.ts                  # Authentication utilities
│   ├── constants.ts             # Application constants
│   └── utils.ts                 # Common utilities
├── types/                       # TypeScript type definitions
│   ├── api.ts                   # API response types
│   ├── auth.ts                  # Authentication types
│   └── common.ts                # Shared types
└── public/                      # Static assets
    ├── icons/                   # SVG icons
    ├── images/                  # Images and graphics
    └── manifest.json            # PWA manifest
```

## 🔌 API Integration

The frontend integrates with the URL shortener backend API through RESTful endpoints:

## 🎨 Design System

The application uses a custom design system built with CSS variables:

### Color Palette

- **Primary**: Blue (#3B82F6) for primary actions and links
- **Background**: Dynamic light/dark theme support
- **Text**: High contrast ratios for accessibility
- **Borders**: Subtle borders with transparency

### Typography

- **Font Family**: Geist Sans for clean, modern appearance
- **Font Sizes**: Scalable system from 12px to 48px
- **Line Heights**: Optimized for readability

### Components

- **Buttons**: Primary, secondary, and danger variants
- **Cards**: Elevated surfaces with subtle shadows
- **Forms**: Consistent input styling with focus states
- **Toast Notifications**: Non-intrusive feedback system

## 🚀 Build and Deployment

### Production Build

```bash
npm run build
npm run start
```

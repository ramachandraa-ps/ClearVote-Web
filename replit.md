# DAO Proposal Analyzer

## Overview

This is a full-stack web application that helps users analyze DAO (Decentralized Autonomous Organization) proposals using AI. Users can submit proposal text and receive intelligent analysis including voting recommendations, reasoning, summaries, and key details about budget impact, duration, risk level, and category.

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **AI Integration**: Google Gemini AI for proposal analysis
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **React SPA** built with Vite for fast development and builds
- **Component-based UI** using shadcn/ui for consistent design system
- **TypeScript** for type safety throughout the application
- **TanStack Query** for efficient API state management and caching
- **Wouter** for lightweight client-side routing

### Backend Architecture
- **Express.js server** with TypeScript for REST API endpoints
- **Modular route handling** with dedicated service layers
- **Memory storage implementation** with interface for easy database migration
- **Error handling middleware** for consistent API responses
- **Development middleware** for logging and debugging

### Database Schema
The application uses three main entities:
- **Users**: Basic user authentication and identification
- **Proposals**: Stores user-submitted proposal content and metadata
- **Analysis Results**: Stores AI analysis results with structured data

### AI Integration
- **Google Gemini AI** integration for proposal analysis
- **Structured JSON responses** with predefined schema for consistency
- **Error handling** for AI service failures and fallbacks

## Data Flow

1. **User Input**: User submits proposal content through the frontend form
2. **API Request**: Frontend sends POST request to `/api/analyze` endpoint
3. **Data Validation**: Backend validates input using Zod schemas
4. **Proposal Storage**: Proposal is saved to the database/memory store
5. **AI Analysis**: Proposal content is sent to Gemini AI for analysis
6. **Result Storage**: AI analysis results are saved to the database
7. **Response**: Combined proposal and analysis data is returned to frontend
8. **UI Update**: Frontend displays analysis results and updates history

## External Dependencies

### Core Dependencies
- **@google/genai**: Google Gemini AI integration for proposal analysis
- **drizzle-orm**: Type-safe SQL ORM for database operations
- **@neondatabase/serverless**: PostgreSQL database connection
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for styling
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Fast build tool and dev server
- **typescript**: Type safety and development experience
- **drizzle-kit**: Database schema management and migrations

## Deployment Strategy

The application is configured for deployment with the following approach:

### Build Process
- **Frontend Build**: Vite builds React app to `dist/public` directory
- **Backend Build**: esbuild bundles server code to `dist` directory
- **Single Deployment**: Both frontend and backend are served from the Express server

### Environment Configuration
- **Development**: Uses Vite dev server with Express API
- **Production**: Express serves static files and API endpoints
- **Database**: PostgreSQL via environment variable `DATABASE_URL`
- **AI Service**: Gemini API key via environment variable `GEMINI_API_KEY`

### Database Management
- **Schema**: Defined in `shared/schema.ts` using Drizzle ORM
- **Migrations**: Generated and managed via `drizzle-kit`
- **Development**: Can use memory storage for quick prototyping
- **Production**: PostgreSQL database with connection pooling

## Recent Changes

**July 18, 2025**: Enhanced UI/UX based on mobile prototype design
- Implemented dark theme as primary design language matching user's mobile prototype
- Updated color scheme with dark blue/navy backgrounds and light blue accents
- Added responsive design with dedicated mobile and desktop layouts
- Integrated theme switching capability (dark/light modes)
- Enhanced component styling with rounded corners and modern card layouts
- Improved mobile navigation with floating action button
- Updated branding to "CleanVote" with professional tagline
- Added comprehensive "How to Use" guide panel for desktop users
- Implemented proper responsive breakpoints for optimal mobile/desktop experience

The application is designed to be easily deployable to platforms like Replit, Vercel, or any Node.js hosting service with minimal configuration required.
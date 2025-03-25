# Technical Context: InsightFlow

## Core Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API Layer**: tRPC
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI with ShadCN
- **Styling**: Tailwind CSS
- **State Management**: React Query + React hooks
- **Forms**: React Hook Form with Zod validation

## Development Environment
- **Package Manager**: npm/Bun
- **Version Control**: Git
- **Deployment**: (To be determined)
- **IDE**: VS Code/Cursor
- **Terminal**: PowerShell (Windows)

## Dependencies
### Frontend
- React 18
- TailwindCSS
- ShadCN UI
- Radix UI components
- Lucide React (icons)
- Next-auth
- React Hook Form

### Backend/Data
- Prisma Client
- tRPC server
- Zod validation
- BCrypt (authentication)
- Superjson (serialization)

### Development
- TypeScript
- ESLint
- Prisma CLI
- Tailwind plugins

## Technical Constraints
- Limited development time (4-5 hours daily)
- Focus on efficiency and rapid development
- Prioritizing type safety and developer experience
- Mobile-responsive requirements
- Performance optimization for core features only

## Development Workflow
1. Local development using `npm run dev`
2. Database migrations with Prisma
3. Type-safe API calls with tRPC
4. Component-driven UI development
5. Documentation as part of development process

## Setup Requirements
```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

This technical context guides development practices and technology choices throughout the project. 
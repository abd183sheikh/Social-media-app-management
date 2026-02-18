# First App - Social Media Management Platform

A Next.js application for managing social media accounts, scheduling posts, and tracking analytics across multiple platforms.

## Features

- **Authentication**: User authentication with NextAuth.js supporting credentials and social login
- **Social Media Integration**: Connect and manage Instagram, Facebook, and Twitter accounts
- **Post Management**: Create, schedule, and publish posts across platforms
- **Analytics Dashboard**: Track followers, engagement, impressions, and other metrics
- **Multi-Platform Support**: Manage multiple social accounts from a single interface

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **State Management**: Zustand
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Validation**: Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20+ installed
- PostgreSQL database (or Neon for serverless)
- Instagram/Facebook/Twitter API credentials (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd first_app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
INSTAGRAM_CLIENT_ID="your-instagram-client-id"
INSTAGRAM_CLIENT_SECRET="your-instagram-client-secret"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
first_app/
├── app/              # Next.js app router pages
│   ├── (auth)/      # Authentication pages (login, register)
│   ├── (dashboard)/ # Dashboard pages (analytics, posts, settings)
│   ├── api/         # API routes
│   └── components/  # Shared components
├── lib/             # Utility functions and database client
├── prisma/          # Database schema and migrations
└── public/          # Static assets
```

## Database Schema

The application uses Prisma with the following main models:
- **User**: User accounts and profiles
- **SocialAccount**: Connected social media accounts
- **Post**: Scheduled and published posts
- **Analytics**: Social media metrics and engagement data
- **Session/Account**: NextAuth.js authentication tables

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The `postinstall` script automatically generates Prisma Client during deployment.

### Environment Variables for Production

Ensure these are set in your production environment:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - Strong random secret
- Social media API credentials (as needed)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not licensed for public use.

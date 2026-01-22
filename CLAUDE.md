# Claude.md - Pollitique Project Guide

This file contains project-specific conventions, setup instructions, and common gotchas for the Pollitique application. Anytime you see Claude do something incorrectly, add it here so it doesn't happen again.

## Project Overview

Pollitique is a Next.js 14 application that provides insights into French politics through polls, data analysis, and media content. The app features a dual-section layout for both content consumption and data visualization.

**Core Features:**
- Latest articles and videos section
- Data and trends visualization
- French political polls analysis

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript 5
- React 18
- Tailwind CSS 3
- Data visualization library (TBD)

## Task Management

This project uses a CLI ticket system for task management. Run `tk help` when you need to use it.

## Development Environment Setup

### Node Version
- **Required**: Node.js 18+
- Use the version specified in `.nvmrc` if present
- If you need to update Node version requirements, update both README.md and this file

### First Time Setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

### Environment Variables
- `.env.local` is gitignored and required for local development
- `.env.example` shows all available configuration options
- **Never commit API keys or secrets** - add them to `.env.local` only

## Git Workflow

### Branch Naming
- Feature branches: `claude/feature-name-sessionId` (for Claude)
- Feature branches: `feature/descriptive-name` (for humans)
- Bug fixes: `fix/descriptive-name`
- **Always develop on feature branches, never on main**

### Commits
- Use clear, descriptive commit messages
- Format: `Add feature X` or `Fix bug in Y` or `Update Z component`
- Focus on the "why" rather than the "what"
- **DO NOT** use `git commit --amend` unless the HEAD commit was created in this session and hasn't been pushed

### Pushing Changes
- Always push with: `git push -u origin <branch-name>`
- Branch must start with `claude/` and end with matching session ID for Claude branches
- If push fails with network errors, retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

## Architecture Patterns

### Content vs Data Architecture
The app has two distinct sections that should be architecturally separated:

**1. Content Section (Articles & Videos)**
- Focus on media consumption and display
- May integrate with external content APIs or CMS
- Prioritize performance for media loading

**2. Data Section (Polls & Trends)**
- Focus on data visualization and analysis
- Handle polling data with proper typing
- Emphasize interactive charts and data exploration

### Directory Structure Conventions
- `/app/api/` - API routes only
- `/components/` - React components (client or server)
  - `/components/content/` - Components for articles/videos section
  - `/components/data/` - Components for polls/trends section
  - `/components/shared/` - Shared UI components
- `/lib/` - Business logic, data fetching, utilities
- `/types/` - TypeScript type definitions
- `/utils/` - Pure utility functions
- `/public/` - Static assets (images, icons, etc.)

**DO NOT:**
- Put business logic in components
- Put API logic directly in page components - use `/lib/api.ts`
- Create utilities in random places - use `/utils/`
- Mix content and data visualization concerns

### Type Safety
- All API responses must have proper TypeScript types in `/types/`
- Create types for: `Poll`, `PollData`, `Article`, `Video`, `TrendData`
- **DO NOT** use `any` type - if you need to, create a proper interface first

## Code Conventions

### Next.js Specific
- Use App Router (not Pages Router)
- API routes go in `/app/api/` with `route.ts` files
- Server Components by default, use `"use client"` only when necessary
- Use `next/image` for images (with proper width/height)

### Component Patterns
- Prefer Server Components for data fetching
- Keep Client Components small and focused
- Use TypeScript interfaces for all component props
- Export components as default when they're the primary export

### Styling
- Use Tailwind CSS classes (already configured)
- Follow mobile-first responsive design
- Use Tailwind's built-in utilities before custom CSS
- Ensure data visualizations are responsive

### Data Fetching
- API routes in `/app/api/` handle all external API calls
- Never call external APIs directly from components
- Cache appropriately using Next.js caching strategies
- Consider data freshness for political polls (they update frequently)

### Internationalization
- Primary language: French
- All UI text should support French
- Consider date/time formatting for French locale
- Political party names and terms should use proper French terminology

## Common Gotchas

### Things NOT to Do

1. **DO NOT commit `.env.local`** - It's gitignored for a reason. Use `.env.example` for documentation.

2. **DO NOT add dependencies without justification** - Check if existing tools can solve the problem first.

3. **DO NOT break TypeScript types** - All type errors must be fixed before committing. Run `npm run build` to check.

4. **DO NOT add error handling for scenarios that can't happen** - Trust internal code. Only validate at system boundaries (user input, external APIs).

5. **DO NOT over-engineer** - Keep solutions simple. Three similar lines of code is better than a premature abstraction.

6. **DO NOT add features beyond what's requested** - A bug fix doesn't need surrounding code cleaned up. A simple feature doesn't need extra configurability.

7. **DO NOT create markdown files** unless explicitly requested - No automatic README updates, no CHANGELOG.md, no CONTRIBUTING.md.

8. **DO NOT use emojis** in commits, code, or comments unless explicitly requested.

9. **DO NOT hardcode French text** without considering i18n - Even if starting without i18n, structure code to make it easy to add later.

10. **DO NOT put static assets in project root** - Static files must be in `/public/` folder to be served correctly by Next.js.

### Debugging Tips

1. **When charts don't render**: Check browser console for errors. Ensure data is properly formatted and matches the chart library's expected structure.

2. **When API calls fail**: Verify environment variables are set in `.env.local`. Check API endpoint paths match the route structure.

3. **When styling breaks**: Check Tailwind classes are valid. Use browser DevTools to inspect applied styles.

### Known Issues

- Project is in initial setup phase
- Data sources for polls not yet determined
- Content API integration pending

## Testing & Deployment

### Before Committing
```bash
npm run lint        # Check for linting errors
npm run build       # Verify TypeScript and build succeeds
```

### Testing Locally
- Development server: `npm run dev` (runs on `http://localhost:3000`)
- Production build: `npm run build && npm run start`

### Deployment
- Deployment platform: TBD (likely Vercel)
- Environment variables must be configured in deployment platform
- Consider caching strategy for poll data

## Recent Changes

Track major changes here so Claude knows what's been updated:

- **2026-01-21**: Project initialized with claude.md

## Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Questions?

If you're unsure about something:
1. Check this file first
2. Look at existing code for patterns
3. Check README.md
4. Ask the team

---

**Last Updated**: 2026-01-21
**Maintained by**: Development team (update this file whenever you see Claude make a mistake)

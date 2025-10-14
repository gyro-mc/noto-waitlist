# Project Structure

## Directory Organization

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── page.tsx           # Home page component
│   ├── globals.css        # Global styles and Tailwind imports
│   └── favicon.ico        # Site favicon
├── components/            # Reusable UI components (shadcn/ui)
│   └── ui/               # Base UI components
├── lib/                  # Utility functions and configurations
│   └── utils.ts          # Tailwind class merging utility (cn)
├── public/               # Static assets
│   ├── *.svg            # Icon and logo files
│   └── ...              # Other static files
└── .kiro/               # Kiro AI assistant configuration
    └── steering/        # AI guidance documents
```

## File Naming Conventions
- **Components**: PascalCase for React components (`Button.tsx`)
- **Pages**: lowercase for App Router pages (`page.tsx`, `layout.tsx`)
- **Utilities**: camelCase for utility functions (`utils.ts`)
- **Assets**: kebab-case for static files (`next-logo.svg`)

## Import Patterns
- Use `@/` path alias for imports from project root
- Components: `@/components/ui/button`
- Utils: `@/lib/utils`
- Types: Define locally or in dedicated types files

## Component Architecture
- Follow shadcn/ui component patterns
- Use CVA for component variants
- Implement proper TypeScript interfaces
- Ensure all components are responsive by default

## Styling Guidelines
- Tailwind-first approach for all styling
- Use `cn()` utility for conditional classes
- Follow mobile-first responsive design
- Leverage CSS variables for theming
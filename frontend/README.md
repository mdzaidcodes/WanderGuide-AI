# WanderGuide AI - Frontend

Next.js frontend application for WanderGuide AI travel planning.

## Features

- Modern, responsive UI with blue color theme
- Interactive trip planning with multi-step form
- Real-time flight and hotel comparison
- AI-generated itinerary display
- Cultural insights and recommendations
- Mobile-first design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **API Client**: Axios
- **Animations**: Framer Motion

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. **Run development server:**
```bash
npm run dev
```

Application will start on `http://localhost:3000`

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
frontend/
├── app/              # Next.js app directory
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Home page
│   └── globals.css  # Global styles
├── components/       # React components
│   ├── layout/      # Header, Footer
│   ├── home/        # Hero, Features
│   ├── trip/        # Trip planning components
│   └── ui/          # Reusable UI components
├── utils/           # Utilities
│   └── api.ts      # API client
└── public/          # Static assets
```

## Design System

### Colors
- Primary Blue: Main brand color
- Secondary Blue: Supporting elements
- Accent Blue: Highlights and CTAs

### Components
- Buttons: `btn-primary`, `btn-secondary`, `btn-outline`
- Cards: `card` class with shadow effects
- Inputs: `input-field` with focus states
- Badges: `badge-blue`, `badge-success`, `badge-warning`

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
1. Build the application:
```bash
npm run build
```

2. Deploy the `.next` folder to your hosting platform

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (required)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


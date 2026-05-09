# SmartTrip AI - Intelligent Travel Assistance Platform

A production-grade SaaS application that generates context-aware packing recommendations based on destination, weather, duration, and activities.

## 🚀 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)

## ✨ Features

### 🏠 Landing Page
- Modern SaaS design with gradient backgrounds
- Animated hero section
- Feature showcase
- Smooth scroll animations

### 🗺️ Trip Planner
- Interactive input panel for trip details
- Destination, duration, weather, and activity selection
- Loading animation during generation
- Intelligent packing list generation

### 📊 Packing Dashboard
- Interactive checklist with mark as packed
- Remove items and add custom items
- Real-time progress tracking
- Missing essentials alerts
- Categorized items (Clothing, Essentials, Electronics, Activity Gear)

### 💡 Trip Insights
- Climate summary
- Activity advisory
- Duration-based packing advice
- Smart preparation notes

### 🧳 My Trips
- Trip history with all details
- Packing progress for each trip
- Clickable cards to view packing lists

## 🧠 Intelligence Engine

The rule-based packing generator evaluates:

- **Weather conditions**: Adds appropriate clothing (thermal jacket for cold, rain gear for rainy)
- **Activities**: Includes specialized gear (hiking boots for trekking, swimwear for beach)
- **Duration**: Scales clothing quantities based on trip length
- **Context**: Provides explanations for each item recommendation

## 🎨 Design System

- Dark mode default
- Soft gradient backgrounds
- Clean spacing with rounded components
- Subtle shadows and animations
- Professional SaaS aesthetic

## 🚀 Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Landing page
│   ├── planner/page.tsx      # Trip planner
│   ├── dashboard/page.tsx    # Packing dashboard
│   ├── insights/page.tsx     # Trip insights
│   ├── trips/page.tsx        # My trips
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── Navigation.tsx        # Navigation bar
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── packingEngine.ts      # Intelligence engine
│   └── store.ts              # Global state management
└── package.json
\`\`\`

## 🎯 Key Features

- **Context-aware recommendations**: Items are suggested based on multiple factors
- **Dynamic explanations**: Each item includes reasoning
- **Interactive UI**: Smooth animations and transitions
- **Responsive design**: Works on all screen sizes
- **Type-safe**: Full TypeScript implementation

## 🏆 Production Ready

- Clean component architecture
- Reusable components
- Proper TypeScript types
- Optimized animations
- Professional design system

Built with ❤️ for intelligent travel planning

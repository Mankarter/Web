# AutoLifeGh - Vehicle Marketplace

A modern, full-stack vehicle marketplace for Ghana built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Set Up Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your credentials:
```bash
cp .env.local.example .env.local
```

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name

### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
autolife-gh/
├── src/
│   ├── app/
│   │   ├── (home)/
│   │   │   └── page.tsx           # Homepage
│   │   ├── vehicles/
│   │   │   ├── page.tsx           # Vehicle listing page
│   │   │   └── [id]/
│   │   │       └── page.tsx       # Vehicle details page
│   │   ├── sell/
│   │   │   └── page.tsx           # Sell vehicle form
│   │   ├── layout.tsx             # Root layout
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FeaturedVehicles.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── LatestArrivals.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── FinancingSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── vehicles/
│   │   │   ├── VehicleCard.tsx
│   │   │   ├── VehicleGrid.tsx
│   │   │   ├── VehicleFilters.tsx
│   │   │   └── VehicleDetails.tsx
│   │   └── forms/
│   │       ├── SearchForm.tsx
│   │       ├── SellVehicleForm.tsx
│   │       └── ContactForm.tsx
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client
│   │   ├── cloudinary.ts          # Cloudinary utils
│   │   └── api.ts                 # API helpers
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   └── hooks/
│       ├── useVehicles.ts
│       ├── useSearch.ts
│       └── useForm.ts
├── public/
│   ├── images/
│   └── icons/
├── .env.local.example
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔧 Setup Guides

### Supabase Setup
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy URL and Anon Key to `.env.local`
4. Set up tables using the SQL schema (see `database-schema.sql`)

### Cloudinary Setup
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Copy your Cloud Name to `.env.local`
3. Configure image upload settings in your dashboard

### Vercel Deployment
```bash
vercel
```

---

## 📦 Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui pattern
- **Forms:** React Hook Form + Zod
- **Database:** Supabase (PostgreSQL)
- **Storage:** Cloudinary
- **Deployment:** Vercel

---

## 🚦 Development Commands

```bash
npm run dev         # Start dev server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run type-check  # TypeScript type checking
```

---

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |

---

## 🎯 Next Steps

1. [ ] Set up Supabase database tables
2. [ ] Configure Cloudinary
3. [ ] Create core components (Hero, Search, Cards)
4. [ ] Build API routes
5. [ ] Add authentication
6. [ ] Deploy to Vercel

---

## 📄 License

MIT License - feel free to use this for your project.

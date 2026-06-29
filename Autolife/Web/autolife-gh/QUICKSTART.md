# 🚀 AutoLifeGh - Quick Start Guide

## Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (free tier available)
- Cloudinary account (free tier available)
- Git

---

## Step 1: Clone & Install

```bash
cd autolife-gh
npm install
# or
yarn install
```

---

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. In **Project Settings → API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `Anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Run the SQL schema (see `DATABASE_SCHEMA.md`):
   - Go to **SQL Editor**
   - Paste and run all commands from `DATABASE_SCHEMA.md`

---

## Step 3: Set Up Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com) and sign up (free)
2. In **Dashboard**, copy your **Cloud Name**
3. Add to `.env.local` as `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

---

## Step 4: Configure Environment

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyXxxxxxxxxxxx
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```

---

## Step 5: Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # React components
│   ├── common/      # Header, Footer
│   ├── home/        # Homepage sections
│   └── vehicles/    # Vehicle listing components
├── lib/             # Utilities & API clients
├── types/           # TypeScript types
└── hooks/           # Custom React hooks
```

---

## 🔗 Available Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/vehicles` | Browse all vehicles |
| `/vehicles/:id` | Vehicle details |
| `/sell` | Sell your vehicle |

---

## 🛠️ Available Commands

```bash
npm run dev         # Start dev server (localhost:3000)
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run type-check  # Check TypeScript
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your GitHub repo
4. Add environment variables (Supabase URL, Anon Key, Cloudinary Name)
5. Click "Deploy"

```bash
# Or deploy via CLI
npm install -g vercel
vercel
```

---

## 📚 Next Steps

- [ ] Create `/vehicles` browse page
- [ ] Create `/vehicles/[id]` details page
- [ ] Create `/sell` form page
- [ ] Add authentication (Supabase Auth)
- [ ] Build API routes for vehicle CRUD
- [ ] Add image upload with Cloudinary
- [ ] Set up email notifications
- [ ] Add messaging system
- [ ] Implement search filters
- [ ] Add admin dashboard

---

## 🆘 Troubleshooting

### "Supabase environment variables not found"
- Make sure `.env.local` file exists
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart dev server: `npm run dev`

### Images not loading from Cloudinary
- Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is correct
- Check Cloudinary dashboard for image uploads
- Ensure `next.config.js` has Cloudinary domain configured

### TypeScript errors
```bash
npm run type-check  # See detailed errors
```

---

## 📖 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)

---

## 💬 Support

For issues or questions, check the project documentation or create an issue on GitHub.

Happy coding! 🚗✨

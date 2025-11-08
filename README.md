# JK Health Care AI

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) for a healthcare AI application.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [pnpm](https://pnpm.io/) package manager

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd jk-health-care-ai
```

2. Install dependencies using pnpm:
```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit the files. You can start editing the page by modifying `src/app/page.tsx`.

### Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run the linter

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Deploy Steps:

1. **Push your code to GitHub** (if not already done):
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project
   - Configure your project settings:
     - **Framework Preset**: Next.js
     - **Build Command**: `pnpm build`
     - **Output Directory**: `.next`
     - **Install Command**: `pnpm install`
   - Click "Deploy"

3. **Automatic Deployments**: Once deployed, Vercel will automatically redeploy your app whenever you push changes to your main branch.

### Environment Variables

If your app uses environment variables, add them in the Vercel dashboard:
1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add your environment variables for Production, Preview, and Development

### Custom Domain (Optional)

You can add a custom domain in the Vercel dashboard:
1. Go to your project dashboard
2. Navigate to Settings → Domains
3. Add your custom domain and follow the DNS configuration instructions

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Vercel Documentation](https://vercel.com/docs) - learn about Vercel deployment features.

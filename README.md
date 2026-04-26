# DevOps Academy 🚀

A production-ready React + Tailwind CSS landing page for **DevOps Academy** — Bengaluru's premier AWS DevOps & GenAI training institute.

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS 3 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |

## 📁 Project Structure

```
devops-academy/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky animated navbar with mobile menu
│   │   ├── Hero.jsx          # Hero section with stats + CTAs
│   │   ├── About.jsx         # Institute info, location, learning modes
│   │   ├── Curriculum.jsx    # Tabbed, filterable, searchable course cards
│   │   ├── Roadmap.jsx       # Animated 3-month training timeline
│   │   ├── Features.jsx      # Why-choose-us grid cards
│   │   ├── Capstone.jsx      # AI Log Analyzer highlight card
│   │   ├── Testimonials.jsx  # Auto-sliding review carousel
│   │   ├── EnrollForm.jsx    # Enrollment form with validation
│   │   ├── Contact.jsx       # Footer with contact details
│   │   └── WhatsAppBtn.jsx   # Floating WhatsApp button
│   ├── data/
│   │   ├── courses.json      # Curriculum modules data
│   │   ├── roadmap.json      # Monthly roadmap data
│   │   └── testimonials.json # Student review data
│   ├── App.jsx               # Main app composition
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles + Tailwind directives
├── index.html                # HTML template with SEO meta tags
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone or navigate to the project
cd devops-academy

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

## 🏗 Build for Production

```bash
npm run build
```

Output is in the `dist/` folder — ready for static hosting.

## ☁️ Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel login
vercel --prod
```

### Option 2: Vercel Dashboard

1. Push your project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and click **New Project**
3. Import your GitHub repository
4. Framework preset: **Vite**
5. Click **Deploy** — done!

### Option 3: Deploy to AWS (S3 + CloudFront)

```bash
# Build first
npm run build

# Sync dist/ to your S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache (optional)
aws cloudfront create-invalidation \
  --distribution-id YOUR_CF_DIST_ID \
  --paths "/*"
```

## 📞 Contact

| | |
|---|---|
| **Phone** | +91 97982-53860 |
| **Email** | info@devopsacademy.co |
| **Address** | BTM Layout, Bengaluru, Karnataka 560076 |
| **Website** | www.devopsacademy.co |

---

© 2026 DevOps Academy. All rights reserved.

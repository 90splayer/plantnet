# 🌿 FloraSense AI — Plant & Flower Discovery App

Upload a photo of any plant or flower and instantly discover its name, origins, habitat, history, cultural significance, and an emotional backstory — powered by OpenAI Vision + GPT-4o.

## Features

- **AI Plant Identification** — Vision model analyzes leaf shape, texture, color, and more
- **Geographic Distribution** — Native regions, climate zones, and habitats
- **Historical Background** — Discovery, cultivation history, name origins
- **Cultural & Medicinal Significance** — Traditional uses across civilizations
- **Emotional Backstory** — A 150–200 word narrative that brings the plant to life
- **Drag & Drop + Mobile Camera** — Works on desktop and mobile
- **Beautiful Nature UI** — Soft greens, cream tones, elegant typography

## Tech Stack

- **Frontend**: Next.js 14 + React + Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-4o (Vision + Text)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variable

Create a `.env.local` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Or on Replit, add `OPENAI_API_KEY` to your Replit Secrets.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy on Replit

1. Upload this folder to Replit
2. Add `OPENAI_API_KEY` to Replit Secrets
3. Click Run — the `.replit` config handles everything

## Folder Structure

```
florasense/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── identify/
│   │   └── page.tsx          # Upload & results page
│   └── api/
│       └── identify/
│           └── route.ts      # Plant identification API
├── components/
│   ├── UploadForm.tsx        # Drag-drop upload with camera support
│   ├── LoadingState.tsx      # Animated loading card
│   └── ResultCard.tsx        # Full results display
├── lib/
│   └── openai.ts             # OpenAI client
├── .env.example
├── .replit
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## API

**POST** `/api/identify`

- **Body**: `multipart/form-data` with `image` field
- **Returns**: Full plant data JSON including identification, distribution, history, significance, and story

## Notes

- Requires an OpenAI API key with access to GPT-4o
- Images are processed in-memory and not stored
- Best results with clear, well-lit photos showing leaves or flowers
- Identification works for 10,000+ plant species

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```
chess-pro
├─ .eslintrc.json
├─ .gitignore
├─ jsconfig.json
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ chess-1.webp
│  ├─ chess-bg.webp
│  ├─ images
│  │  └─ puzzles
│  │     ├─ puzzle-1.webp
│  │     ├─ puzzle-2.webp
│  │     └─ puzzle-3.webp
│  ├─ next.svg
│  ├─ sounds
│  │  ├─ capture.mp3
│  │  ├─ castle.mp3
│  │  ├─ checkmate.mp3
│  │  ├─ move-check.mp3
│  │  ├─ move-self.mp3
│  │  ├─ notify.mp3
│  │  └─ promote.mp3
│  ├─ stockfish.js
│  └─ vercel.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ (auth)
│  │  │  ├─ signin
│  │  │  │  └─ page.jsx
│  │  │  └─ signup
│  │  │     └─ page.jsx
│  │  ├─ (root)
│  │  │  ├─ about
│  │  │  │  └─ page.jsx
│  │  │  ├─ analysis
│  │  │  │  ├─ Analysis.jsx
│  │  │  │  └─ page.jsx
│  │  │  ├─ game
│  │  │  │  ├─ computer
│  │  │  │  │  ├─ Computer.jsx
│  │  │  │  │  └─ page.jsx
│  │  │  │  ├─ page.jsx
│  │  │  │  ├─ PlayComponent.jsx
│  │  │  │  └─ Waiting.jsx
│  │  │  ├─ membership
│  │  │  │  └─ page.jsx
│  │  │  ├─ play
│  │  │  │  ├─ gameFormats.js
│  │  │  │  └─ page.jsx
│  │  │  ├─ profile
│  │  │  │  └─ page.jsx
│  │  │  └─ puzzles
│  │  │     ├─ page.jsx
│  │  │     └─ Puzzles.jsx
│  │  ├─ api
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.js
│  │  └─ page.jsx
│  ├─ components
│  │  ├─ game
│  │  │  ├─ assets
│  │  │  │  └─ sounds
│  │  │  │     └─ index.js
│  │  │  ├─ Board
│  │  │  │  ├─ EvalBar.jsx
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ PreviousMoves.jsx
│  │  │  └─ online
│  │  │     ├─ Clock.jsx
│  │  │     ├─ CreateGame.jsx
│  │  │     ├─ GameActions.jsx
│  │  │     ├─ PLayWithFriend.jsx
│  │  │     ├─ RematchButton.jsx
│  │  │     └─ Users.jsx
│  │  ├─ other
│  │  │  ├─ Hero.jsx
│  │  │  ├─ OverViews.jsx
│  │  │  └─ Puzzles.jsx
│  │  ├─ reuseable
│  │  │  └─ SideSelection.jsx
│  │  ├─ shared
│  │  │  ├─ Footer
│  │  │  │  └─ index.jsx
│  │  │  └─ Header
│  │  │     ├─ index.jsx
│  │  │     ├─ links.js
│  │  │     ├─ MobileNavbar.jsx
│  │  │     └─ SimpleNabar.jsx
│  │  └─ user
│  └─ utils
│     ├─ engine
│     │  ├─ bestmove.js
│     │  └─ index.js
│     ├─ hooks
│     │  └─ useSound.js
│     └─ socket
│        └─ socket.js
└─ tailwind.config.js

```